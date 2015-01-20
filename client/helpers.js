_.each({
    isAdmin: function(u){
    var user = u || Meteor.user();

    return user && _.contains(user.roles, "admin");
  }
}, function(fn, name){
  Template.registerHelper(name, fn);
});
