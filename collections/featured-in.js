FeaturedIn = new Meteor.Collection("featuredIn");

FeaturedIn.attachSchema(new SimpleSchema({
  url: {
    type: String,
    optional: true
  },
  imgUrl: {
    type: String,
    autoform: {
      afFieldInput: {
        type: "fileUpload",
        collection: "images"
      }
    }
  }
}));

FeaturedIn.helpers({
  logo: function(){
    var file = Images.findOne(this.imgUrl);
    return file ? file.url() : this.imgUrl;
  }
});

if(Meteor.isServer){
  Meteor.publish("featuredIn", function(){
    return FeaturedIn.find();
  });
}
