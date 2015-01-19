//TODO: modularise if this ever grows

AppController = RouteController.extend({
  layoutTemplate: "appLayout",
  action: function(){
    throw new Error("action: override me!");
  }
});

HomeController = AppController.extend({
  action: function(){
    this.render("homePage");
  }
});

AdminSignInController = AppController.extend({
  subsciptions: function(){
    return Meteor.subscribe("users");
  },
  action: function(){
    this.render("adminSignInPage");
  }
});
