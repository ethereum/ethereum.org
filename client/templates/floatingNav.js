Template.floatingNav.rendered = function(){
  //this._augHandler = Plugins.augmentingNav($(this.firstNode), "shifted");
};

Template.floatingNav.destroyed = function(){
  //Plugins.deaugmentNav(this._augHandler);
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
