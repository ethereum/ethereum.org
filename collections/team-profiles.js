TeamProfiles = new Meteor.Collection("teamProfiles");
TeamProfileSortOrder = new Meteor.Collection("teamProfileSortOrder");

TeamProfiles.attachSchema(new SimpleSchema({
  name: {
    type: String
  },
  photoUrl: {
    type: String
  },
  bio: {
    type: String,
    autoform: {
      afFieldInput: {
        rows: 6
      }
    }
  }
}));

TeamProfileSortOrder.attachSchema(new SimpleSchema({
  order: {
    type: [new SimpleSchema({
      id: {
        type: String,
        autoform: {
          options: function(){
            return _.map(TeamProfiles.find().fetch(), function(profile){
              return {
                label: profile.name,
                value: profile._id
              };
            });
          }
        }
      }
    })]
  }
}));

if(Meteor.isServer){
  Meteor.publish("teamProfiles", function(){
    return TeamProfiles.find();
  });
  Meteor.publish("teamProfileSortOrder", function(){
    return TeamProfileSortOrder.find();
  });
}else{
  Meteor.subscribe("teamProfiles");
  Meteor.subscribe("teamProfileSortOrder");
}

