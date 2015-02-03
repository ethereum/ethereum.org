Meteor.startup(function(){
  if(!Meetups.find().count()){
    console.log("importing meetups");
    
    Assets.getText("meetup-cities.csv", function(err, csv){
      async.parallel(_.map(Baby.parse(csv, {header: true}).data, function(row){
        return function(cb){
          Meetups.insert(_.extend(row,{
            city: toHumanCase(row.city),
            country: toHumanCase(row.country),
            lat: parseFloat(row.lat),
            lon: parseFloat(row.lon)
          }), function(){
            cb();
          });
        };
      }), function(err, data){
        if(err) throw err;
        console.log("inserted", data.length, "documents");
      });
    });
  }
});

function toHumanCase(sentence){
  return _.map(sentence.split(" "), function(word){
    return word[0].toUpperCase() + word.slice(1).toLowerCase();
  }).join(" ");
}
