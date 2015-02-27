Plugins = {
  augmentingNav: function($el, cssClass){
    var handler;
    
    $(window).on("scroll",handler = _.throttle(function(){
      if($el.is(".augmenting-nav")){
        if($(document).scrollTop() >= $("#opener").outerHeight()){
          $el.removeClass(cssClass);
        }else{
          $el.addClass(cssClass);
        }
      }
    }, 200));

    return handler;
  },
  deaugmentNav: function(handler){
    $(window).off("scroll",handler);
  },
  autoscroll: function($el,opt){
    var run = true,
        stop = function(){  run = false; };
    
    opt = _.extend({
      durationFactor: 10000
    }, opt);

    var scroll = function(){
      var $scrollers = $el.children(),
          w = $scrollers.first().outerWidth(),
          duration = opt.durationFactor * (w/250);

      $scrollers.css({
        "transition": "transform " + duration + "ms linear",
        "-webkit-transition": "-webkit-transform " + duration + "ms linear",
        "transform": "translate(-" + w + "px,0px)"
      });
      setTimeout(function(){
        if(run){
          $scrollers.css("transition", "none");
          $scrollers.css("transform", "translate(0,0)");
          setTimeout(function(){
            scroll();
          }, duration ? 0 : 200);
        }
      }, duration);
    };

    scroll();

    return stop;
  }
};
