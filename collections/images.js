Images = new FS.Collection("images", {
  stores: [
    new FS.Store.S3("images", Meteor.isServer ? {
      accessKeyId: Meteor.settings.S3_KEY,
      secretAccessKey: Meteor.settings.S3_SECRET,
      bucket: Meteor.settings.S3_BUCKET,
      ACL: "public-read"
    } : undefined)
  ],
  filter: {
    allow: {
      contentTypes: ["image/*","text/*" ]
    }
  }
});

if(Meteor.isServer){
  Images.allow({
    insert: CollectionHelpers.ifAdmin,
    update: CollectionHelpers.ifAdmin,
    remove: CollectionHelpers.ifAdmin,
    download: function(){return true;}
  });
  Meteor.publish("images", function(){
    return Images.find();
  });
}
