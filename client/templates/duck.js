var DUCK_PERIOD = 10000,//ms
    DUCK_PROBABILITY = 0.025,
    DUCK_DURATION = 400;//ms
    

var toDuckOrNotToDuck = _.throttle(function(){
  var x = Math.random();
  if(x < DUCK_PROBABILITY){
    Session.set("engage-the-duck", true);

    setTimeout(function(){
      Session.set("engage-the-duck", false);
    }, DUCK_DURATION);
  }
}, DUCK_PERIOD, {leading: false});

Template.duck.rendered = function(){
  $(document).on("mousemove",toDuckOrNotToDuck);
};

Template.duck.destroyed = function(){
  $(document).off("mousemove",toDuckOrNotToDuck);
};

Template.duck.helpers({
  duck: function(){
    return Session.get("engage-the-duck");
  },
  duckPos: function(){
    if(Session.get("engage-the-duck")){
      var t = Math.round(($(window).height() - 250) * Math.random()) + "px",
          l = Math.round(($(window).width() - 250) * Math.random()) + "px";
      return "left:"+l+";top:"+t+";";
    }
  }
});
