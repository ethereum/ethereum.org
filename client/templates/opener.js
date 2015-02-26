Template.opener.rendered = function(){
  this._rotateInterval = setInterval(function(){
    var $cur = this.$(".tagline li.active"),
        $next = $cur.next().length ? $cur.next() : $cur.parent().children().first();

    $cur.removeClass("active");
    $next.addClass("active");
  },10000);
};

Template.opener.destroyed = function(){
  clearInterval(this._rotateInterval);
};
