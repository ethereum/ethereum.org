Images = new FS.Collection("images", {
  stores: [ new FS.Store.FileSystem("images")]
});

if(Meteor.isServer){
  Images.allow({
    insert: CollectionHelpers.ifAdmin,
    update: CollectionHelpers.ifAdmin,
    remove: CollectionHelpers.ifAdmin,
    download: function(){
      return true;
    }
  });

  Meteor.publish("images", function(){
    return Images.find();
  });
}else{
  Meteor.subscribe("images");
}
