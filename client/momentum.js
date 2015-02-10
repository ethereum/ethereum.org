var duration = 500;

Momentum.registerPlugin("slide-fade", function(options){
  return {
    insertElement: function(node, next, done){
      var $node = $(node);

      $node.hide()
        .insertBefore(next)
        .velocity("fadeIn",{
          duration: duration,
          delay: duration
        });
    },
    removeElement: function(node, done){
      var $node = $(node),
          d = ($(".slide").data("slide-direction") =="prev") ? -1 : 1;

      $node.velocity({
        translateX: $node.offset().left + $node.outerWidth() * d,
        opacity: 0
      }, {
        easing: "ease-in-out",
        duration: duration,
        complete: function(){
          $node.remove();
          done();
        }
      });
    }
  };
});

Momentum.registerPlugin("fade-text", function(options){
  return {
    insertElement: function(node,next,done){
      $(node).hide().insertAfter(next).velocity("fadeIn", {
        duration: duration,

        complete: function(){
          done();
        }
      });
    },
    removeElement: function(node, done){
      var $node = $(node);
      $node.velocity("fadeOut", {
        duration: duration,
        complete: function(){
          $node.remove();
          done();
        }
      });
    }
  };
});
