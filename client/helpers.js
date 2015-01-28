var helpers = {
  isAdmin: function(u){
    var user = u || Meteor.user();

    return user && _.contains(user.roles, "admin");
  },
  formatDate: function(date, format){
    return moment(date).format(format);
  }
};

_.each(helpers, function(fn, name){
  Template.registerHelper(name, fn);
});
