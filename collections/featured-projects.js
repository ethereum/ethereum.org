FeaturedProjects = new Meteor.Collection("featuredProjects");

FeaturedProjects.attachSchema(new SimpleSchema({
  name: {
    type: String
  },
  description: {
    type: String
  },
  link: {
    type: String
  },
  imgUrl:{
    type: String,
    autoform: {
      afFieldInput: {
        type: "fileUpload",
        collection: "images"
      }
    },
    label: "Thumbnail"
  },
  largeImage: {
    type: Boolean,
    optional: true
  }
}));


FeaturedProjects.helpers({
  logo: function(){
    var file = Images.findOne(this.imgUrl);
    return file ? file.url() : this.imgUrl;
  }
});


if(Meteor.isServer){
  Meteor.publish("featuredProjects", function(){
    return FeaturedProjects.find();
  });
}
