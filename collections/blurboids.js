Blurboids = new Meteor.Collection("blurboids");


Blurboids.attachSchema(new SimpleSchema({
  text: {
    type: String
  },
  appearAfter: {
    type: String,
    optional: true,
    autoform: {
      options: function(){
        return _.map(Blurboids.find().fetch(), function(b){
          return {
            label: b.text,
            value: b._id
          };
        });
      }
    }
  }
}));

if(Meteor.isServer){
  Meteor.publish("blurboids", function(){
    return Blurboids.find();
  });
}else{
  Meteor.subscribe("blurboids");
}
