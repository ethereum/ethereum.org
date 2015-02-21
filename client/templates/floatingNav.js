var augHandler;

Template.floatingNav.rendered = function(){
  augHandler = UI.augmentingNav($(this.firstNode), "shifted");
};

Template.floatingNav.destroyed = function(){
  UI.deaugmentNav(augHandler);
};


Template.floatingNav.events({
  "click a": function(e, tmpl){
    e.preventDefault();

    $($(e.currentTarget).attr("href")).velocity("scroll", {
      duration: 400,
      easing: "ease-out",
      offset: -$(".navbar").height()
    });
  }
});
