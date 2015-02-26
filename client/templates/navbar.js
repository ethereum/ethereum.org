var augmentHandler;

Template.navbar.rendered = function(){
  Plugins.augmentingNav($(this.firstNode), "lifted");
};



