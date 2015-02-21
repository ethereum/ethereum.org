var stopScroll;

Template.opener.rendered = function(){
  stopScroll = UI.autoscroll(this.$(".tweets-container"));
};

Template.opener.destroyed = function(){
  stopScroll();
};
