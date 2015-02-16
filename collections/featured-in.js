FeaturedIn = new Meteor.Collection("featuredIn");

FeaturedIn.attachSchema(new SimpleSchema({
  url: {
    type: String,
    optional: true
  },
  imgUrl: {
    type: String
  }
}));

if(Meteor.isServer){
  Meteor.publish("featuredIn", function(){
    return FeaturedIn.find();
  });
}
