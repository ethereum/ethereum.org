Template.autoscroll.rendered = function(){
  this._stopAutoscroll = Plugins.autoscroll(this.$(".autoscroll"));
};

Template.autoscroll.destroyed = function(){
  this._stopAutoscroll();
};
