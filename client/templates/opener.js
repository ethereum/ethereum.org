var stopScroll;

Template.opener.rendered = function(){
  stopScroll = UI.autoscroll(this.$(".tweets-container .scroll"));
};

Template.opener.destroyed = function(){
  stopScroll();
};
