TeamProfiles = new Meteor.Collection("teamProfiles");

TeamProfiles.attachSchema(new SimpleSchema({
  name: {
    type: String
  },
  title: {
    type: String
  },
  photoId: {
    type: String,
    optional: true,
    autoform: {
      afFieldInput:{
        type: "fileUpload",
        collection: "Images"
      }
    }
  },
  prev: {
    type: String,
    optional: true
  },
  next: {
    type: String,
    optional: true
  }
}));

TeamProfiles.helpers({
  photo: function(){
    return Images.findOne(this.photoId);
  }
});

if(Meteor.isServer){
  Meteor.publish("teamProfiles", function(){
    return TeamProfiles.find();
  });

  TeamProfiles.allow({
    insert: CollectionHelpers.ifAdmin,
    update: CollectionHelpers.ifAdmin,
    remove: CollectionHelpers.ifAdmin
  });
}else{
  Meteor.subscribe("teamProfiles");
}



