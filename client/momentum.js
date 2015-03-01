var duration = 500;

Momentum.registerPlugin('fade2', function(options) {
  return {
    insertElement: function(node, next) {
      $(node)
        .hide()
        .insertBefore(next)
        .velocity('fadeIn',{
          duration: options.duration || 200
        });
          
    },
    removeElement: function(node) {
      $(node).velocity('fadeOut', {
        duration: options.duration || 200
      },function() {
        $(this).remove();
      });
          
    }
      
  }
});
