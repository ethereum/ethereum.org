//TODO: modularise if this ever grows > 200 loc

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
    this.subscribe("pressReleases");
    this.subscribe("blurboids");
  },
  data: function(){
    return {
      featuredMeetups: Meetups.find({featured: true}),
      meetups: Meetups.find(),
      youtubeVideos: YoutubeVideos.find({},{limit:9, sort: {pubDate: -1}}),
      blogFeed: FeedEntries.find({feed_category: "Blog"}, {limit: 3, sort: {pubdate: -1}}),
      tweets: FeedEntries.find({feed_category: "Twitter"}, {limit: 15, sort: {pubdate: -1}}),
      press: PressReleases.find({}, {fields: {body: 0},limit: 20, sort: {publishedAt: -1}}),
      projectGroups: groupByRows(FeaturedProjects.find().fetch(), 4),
      featuredIn: FeaturedIn.find().fetch(),
      augmentingNav: true
    };
  },
  action: function(){
    this.render("homePage");
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
    return {
      profiles: _.map(lodash.shuffle(TeamProfiles.find().fetch()), function(p, i){
        return {
          profile: p,
          index: i
        };
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

PartnershipController = AppController.extend({
  action: function(){
    this.render("partnershipPage");
  }
});

MiningController = AppController.extend({
  action: function(){
    this.render("miningPage");
  }
});

FoundationController = AppController.extend({
  action: function(){
    this.render("foundationPage");
  }
});

EtherController = AppController.extend({
  action: function(){
    this.render("etherPage");
  }
});

CompanyStructureController = AppController.extend({
  action: function(){
    this.render("companyStructurePage");
  }
});

LicensingController = AppController.extend({
  action: function(){
    this.render("licensingPage");
  }
});

function groupByRows(items, perRow){
  return _.reduce(items, function(groups, item, i){
    var groupI = Math.floor(i / perRow);
    
    (groups[groupI] = groups[groupI] || []).push(item);

    return groups;
  }, []);
}
