var key = Meteor.settings.YOUTUBE_API_KEY;

Meteor.startup(function(){
  if(key){
    YoutubeApi.authenticate({
      type: "key",
      key: key
    });
    
    var pullVideos = function(){
      YoutubeApi.search.list({
        part: "id,snippet",
        order: "date",
        maxResults: 6,
        channelId: Meteor.settings.YOUTUBE_ETHEREUM_CHANNEL_ID
      }, function(err, data){
        var Fiber = Npm.require("fibers");
        
        _.each(data.items, function(item){
          var id = item.id.videoId;
          Fiber(function(){
            if(!YoutubeVideos.find({_id:id}).count()){
              
              console.log("inserting a vid:", id);
              
              YoutubeVideos.insert({
                _id: id,
                url: "http://www.youtube.com/watch?v=" + id,
                pubDate: new Date(item.snippet.publishedAt),
                thumbnails: item.snippet.thumbnails,
                description: item.snippet.description
              });
            }
          }).run();
        });
      });
    };

    pullVideos();

    setInterval(pullVideos, 1000 * 60 * 60 * 6); //every six hours
  }
});
