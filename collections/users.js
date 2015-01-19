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

// if(Meteor.isServer){
//   Meteor.publish("userData", function(){
//     return Meteor.users.find({_id: this.userId});
//   });
//   Meteor.publish("allUserData", function(){
//     return Meteor.users.find({}, {
//       fields: {
//         username: 1
//       }
//     });
//   });
// }else{
//   Meteor.subscribe("userData");
//   Meteor.subscribe("allUserData");
// }
