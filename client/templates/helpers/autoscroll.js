Template.autoscroll.rendered = function(){
  var stop = UI.autoscroll(this.$(".autoscroll"), {
    //durationFactor: durationFactor
  });
  this.autorun(function(){
    //only need this to grab the onInvalidate callback
  }).onInvalidate(function(){
    stop();
  });
};
