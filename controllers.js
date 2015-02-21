//TODO: modularise if this ever grows

AppController = RouteController.extend({
  layoutTemplate: "appLayout",
  onAfterAction: function(){
    window.scrollTo(0,0);
  },
  action: function(){
    throw new Error("action: override me!");
  }
});

HomeController = AppController.extend({
  subscriptions: function(){
    this.subscribe("meetups");
    this.subscribe("youtubeVideos");
    this.subscribe("feed_entries");
    this.subscribe("featuredProjects");
    this.subscribe("featuredIn");
  },
  data: function(){
    return {
      featuredMeetups: Meetups.find({featured: true}),
      meetups: Meetups.find(),
      youtubeVideos: YoutubeVideos.find({},{limit:4, sort: {pubDate: -1}}),
      blogFeed: FeedEntries.find({feed_category: "Blog"}, {limit: 3, sort: {pubdate: -1}}),
      tweets: FeedEntries.find({feed_category: "Twitter"}, {limit: 20, sort: {pubdate: -1}}),
      projectGroups: groupByRows(FeaturedProjects.find().fetch(), 3),
      featuredInGroups: groupByRows(FeaturedIn.find().fetch(), 5),
      augmentingNav: true
    };
  },
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

SignInController = AppController.extend({
  subsciptions: function(){
    return Meteor.subscribe("users");
  },
  action: function(){
    this.render("adminSignInPage");
  }
});

TeamController = AppController.extend({
  // team collections are always published (due to yogiben's admin being an utter shit)
  action: function(){
    this.render("teamPage");
  },
  data: function(){
    var profiles = lodash.indexBy(TeamProfiles.find().fetch(), "_id");
    return {
      profiles: _.map(TeamProfileSortOrder.findOne().order, function(p){
        return profiles[p.id];
      })
    };
  }
});

PressController = AppController.extend({
  subscriptions: function(){
    this.subscribe("feed_entries");
    this.subscribe("pressReleases");
  },
  action: function(){
    this.render("pressPage");
  },
  data: function(){
    return {
      blogFeed: FeedEntries.find({feed_category: "Blog"}, {
        limit: 3,
        sort: {pubdate: -1},
        fields: {
          summary: 0
        }
      }),
      tweets: FeedEntries.find({feed_category: "Twitter"}, {limit: 5, sort: {pubdate: -1}}),
      press: PressReleases.find({}, {limit: 20, sort: {publishedAt: -1}})
    };
  }
});

ProjectsController = AppController.extend({
  action: function(){
    this.render("projects");
  }  
});



function groupByRows(items, perRow){
  return _.reduce(items, function(groups, item, i){
    var groupI = Math.floor(i / perRow);
    
    (groups[groupI] = groups[groupI] || []).push(item);

    return groups;
  }, []);
}
