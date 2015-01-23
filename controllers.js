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

NewsController = AppController.extend({
  subscriptions: function(){
    Meteor.subscribe("feed_entries");
  },
  data: function(){
    return {
      blogFeed: FeedEntries.find({feed_category: "Blog"}, {limit: 3}),
      tweets: FeedEntries.find({feed_category: "Twitter"}, {limit: 5})
    };
  },
  action: function(){
    this.render("newsPage");
  }
});
