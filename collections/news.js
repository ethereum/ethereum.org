News = new Meteor.Collection("news");

News.attachSchema(new SimpleSchema({
  title: {
    type: String
  },
  url: {
    type: String
  },
  blurb: {
    type: String
  }
}));