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
