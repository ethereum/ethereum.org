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
