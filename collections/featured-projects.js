FeaturedProjects = new Meteor.Collection("featuredProjects");

FeaturedProjects.attachSchema(new SimpleSchema({
  imgUrl:{
    type: String
  },
  name: {
    type: String
  },
  description: {
    type: String
  },
  link: {
    type: String
  },
  imgUrl: {
    type: String
  }
}));

if(Meteor.isServer){
  Meteor.publish("featuredProjects", function(){
    return FeaturedProjects.find();
  });
}
