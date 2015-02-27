Template.duck.rendered = function(){
  $(document).mousemove(_.throttle(function(){
    var x = Math.random();
    if(x < 0.025){
      Session.set("engage-the-duck", true);

      setTimeout(function(){
        Session.set("engage-the-duck", false);
      }, 400);
    }
  }, 10000));
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
