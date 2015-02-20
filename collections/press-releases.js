PressReleases = new Meteor.Collection("pressReleases");


PressReleases.attachSchema(new SimpleSchema({
  title: {
    type: String
  },
  body: {
    type: String,
    autoform: {
      afFieldInput: {
        rows: 20
      }
    }
  },
  publishedAt: {
    type: Date,
    autoValue: function(){
      return new Date();
    }
  }
}));

if(Meteor.isServer){
  Meteor.publish("pressReleases", function(){
    return PressReleases.find({}, {limit: 30, sort: {publisedAt: -1}});
  });
}
