var resizeCB = function(){};

$(window).resize(function(){
  resizeCB();
});

Template.opener.rendered = function(){
  var $opener = this.$("#opener"),
      $video = $opener.find("video");

  resizeCB = function(){
    var h = $(window).height() - $opener.offset().top;
    $opener.css("opacity", 1);
    $opener.css("height", h);
    $video.css("height", h);
  };
  resizeCB();

  resizeCB = _.debounce(resizeCB,200);
};

Template.opener.events({
  "click .scrolldown": function(e, tmpl){
    var $container = $(tmpl.firstNode); 
    e.preventDefault();


    $(tmpl.lastNode).next().velocity("scroll", {
      duration: 400,
      easing: "ease-out",
      offset: -$(".navbar").height()
    });
  }
});
