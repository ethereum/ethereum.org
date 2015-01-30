Router.route("/",{
  name: "home"
});

Router.route("/admin/signin",{
  name: "adminSignIn"
});

Router.route("/news",{
  name: "news"
});

Router.route("/community",{
  name: "community"
});

Router.route("/philosophy",{
  name: "philosophy",
});

Router.route("/technology",{
  name: "technology"
});

Router.route("/team", {
  name: "team"
});

Router.route("/team/edit", {
  name: "team.edit",
  controller: "TeamController",
  action: "edit"

});

