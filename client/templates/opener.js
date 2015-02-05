var resizeCB = function(){};

$(window).resize(function(){
  resizeCB();
});

Template.opener.rendered = function(){
  var $opener = this.$("#opener");
  (resizeCB = _.debounce(function(){
    var h = $(window).height() - $opener.offset().top;
    $opener.css("height", h);
    $opener.find("video").css("height", h);
  }, 200))();
};
