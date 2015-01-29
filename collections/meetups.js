Meetups = new Meteor.Collection("meetups");

Meetups.attachSchema(new SimpleSchema({
  city: {
    type: String
  },
  state: {
    type: String
  },
  country: {
    type: String
  },
  longitude: {
    type: String
  },
  latitude: {
    type: String
  },
  meetup_id: {
  	type: String
  }
}));