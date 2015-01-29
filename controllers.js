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

TechnologyController = AppController.extend({
  action: function(){
    this.render("technologyPage");
  }
});

PhilosophyController = AppController.extend({
  action: function(){
    this.render("philosophyPage");
  }
});

TeamController = AppController.extend({
  action: function(){
    this.render("teamPage");
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
      blogFeed: FeedEntries.find({feed_category: "Blog"}, {limit: 3, sort: {pubdate: -1}}),
      tweets: FeedEntries.find({feed_category: "Twitter"}, {limit: 5, sort: {pubdate: -1}})
    };
  },
  action: function(){
    this.render("newsPage");
  }
});

TeamController = AppController.extend({
  subscriptions: function(){
    this.subscribe("teamProfiles");
    this.subscribe("images");
  },
  data: function(){
    var profiles = TeamProfiles.find().fetch(),
        indexed = _.indexBy(profiles, "_id"),
        ordered = [],
        current = _.find(profiles, function(p){ return !p.prev;});

    while(current){
      ordered.push(current);
      current = indexed[current.next];
      if(ordered.length > profiles.length){
        throw new Error("Team profile list loop detected!");
      }
    }
    
    return {
      teamProfiles: ordered
    };
  },
  action: function(){
    this.render("teamPage");
  },
  edit: function(){
    this.render("editTeamPage");
  }
});
