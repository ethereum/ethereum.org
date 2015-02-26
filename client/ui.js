UI = {
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
        stop = function(){ run = false; };
    
    opt = _.extend({
      durationFactor: 10000
    }, opt);
    
    var scroll = function(){
      var $fChild = $el.children().first(),
          w = $fChild.outerWidth(),
          duration = opt.durationFactor * (w / 250);

      $fChild.velocity({
        "margin-left": - w
      }, {
        duration: duration,
        easing: "linear",
        complete: function(){
          if(run){
            setTimeout(function(){
              $fChild.detach();
              $fChild.css("margin-left", 0);
              $el.append($fChild);
              scroll();
            }, duration ? 0 : 200);
          }
        }
      });
    };

    scroll();

    return stop;
  }
};
