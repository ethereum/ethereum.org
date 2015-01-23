Meteor.users.attachSchema(new SimpleSchema({
  emails: {
    type: [Object],
    optional: true
  },
  "emails.$.address": {
    type: String,
    regEx: SimpleSchema.RegEx.Email
  },
  "emails.$.verified": {
    type: Boolean
  },
  createdAt: {
    type: Date
  },
  roles: {
    type: [String],
    optional: true
  },
  services: {
    type: Object,
    optional: true,
    blackbox: true
  }
}));

