TeamMembers = new Meteor.Collection("team-members");

TeamMembers.attachSchema(new SimpleSchema({
  name: {
    type: String
  },
  bio: {
    type: String
  },
  photo_url: {
    type: String
  }
}));