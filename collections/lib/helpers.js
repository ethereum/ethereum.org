CollectionHelpers = {
  ifAdmin: function(userId){
    var u = Meteor.users.findOne(userId);

    return u && u.roles && _.contains(u.roles, "admin");
  }
};
