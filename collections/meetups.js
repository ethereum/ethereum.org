Meetups = new Meteor.Collection("meetups");

Meetups.attachSchema(new SimpleSchema({
  code: {
    type: String
  },
  city: {
    type: String
  },
  country: {
    type: String
  },
  lat: {
    type: Number,
    decimal: true 
  },
  lon: {
    type: Number,
    decimal: true
  },
  url: {
    type: String
  },
  featured: {
    type: Boolean,
    optional: true,
    defaultValue: false
  }
}));

if(Meteor.isServer){
  Meteor.publish("meetups", function(){
    return Meetups.find();
  });
}else{
  Meteor.subscribe("meetups");
}
