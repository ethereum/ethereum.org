Router.route("/", function(){
  this.layout("mainLayout");
  this.render("homePage");
}, {name: "home"});
