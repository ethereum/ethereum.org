YoutubeVideos = new Meteor.Collection("youtubeVideos");

YoutubeVideos.attachSchema(new SimpleSchema({
  url: {
    type: String
  },
  thumbnails: {
    type: Object,
    blackbox: true
  },
  pubDate: {
    type: Date
  },
  description: {
    type: String
  }
}));


if(Meteor.isServer){
  Meteor.publish("youtubeVideos", function(){
    return YoutubeVideos.find({}, {limit: 5});
  });
}
