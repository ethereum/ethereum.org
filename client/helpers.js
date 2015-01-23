_.each({
  isAdmin: function(u){
    var user = u || Meteor.user();

    return user && _.contains(user.roles, "admin");
  },
  formatDate: function(date, format){
    return moment(date).format(format);
  }
}, function(fn, name){
  Template.registerHelper(name, fn);
});
