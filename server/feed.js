Meteor.startup(function(){
  Feed.collections({
    feeds: Feeds,
    feed_entries: FeedEntries
  });

  Feed.createRssFeed({
    _id: "Ethereum blog",
    category: "Blog",
    link: Meteor.settings.ETH_BLOG_FEED,
    refresh_interval: 10000
  });
  
  Feed.createTwitterFeed({
    _id: "Ethereum Twitter",
    category: "Twitter",
    link: Meteor.settings.TWITTER_LINK,
    refresh_interval: 2000
  });

  Feed.initTwitterFeed({
    consumer_key: Meteor.settings.TWITTER_CONSUMER_KEY,
    consumer_secret: Meteor.settings.TWITTER_CONSUMER_SECRET,
    access_token: Meteor.settings.TWITTER_ACCESS_TOKEN,
    access_token_secret: Meteor.settings.TWITTER_ACCESS_TOKEN_SECRET,
    screen_name: Meteor.settings.TWITTER_SCREEN_NAME
  });

  Feed.read();
});
