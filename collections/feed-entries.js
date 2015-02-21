FeedEntries = new Meteor.Collection("feed_entries");

FeedEntries.attachSchema(new SimpleSchema({
  author: {
    type: String,
    optional: true
  },
  date: {
    type: Date,
    optional: true
  },
  feed_category: {
    type: String
  },
  feed_id: {
    type: String
  },
  link: {
    type: String
  },
  pubdate: {
    type: Date,
    optional: true
  },
  summary: {
    type: String
  },
  title: {
    type: String
  }
}));

if(Meteor.isServer){
  Meteor.smartPublish("feed_entries", function(){
    return [
      FeedEntries.find({feed_category: "Blog"}, {limit: 10, sort: {pubdate: -1}}),
      FeedEntries.find({feed_category: "Twitter"}, {limit: 40, sort: {pubdate: -1}})
    ];
  });
}
