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
