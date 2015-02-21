var augmentHandler;

Template.navbar.rendered = function(){
  UI.augmentingNav($(this.firstNode), "lifted");
};



