Pages = new Meteor.Collection("pages");

Pages.attachSchema(new SimpleSchema({
  name: {
    type: String
  },
  title: {
    type: String
  },
  content: {
    type: String
  }
}));