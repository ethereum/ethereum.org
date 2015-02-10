var mod = function(i,n){ return ((i % n)+n)%n; }; // built-in js mod sucks

var slides = [{
  background: "simplicityBackground",
  content: "simplicityContent",
  title: "Simplicity"
},{
  background: "universalityBackground",
  content: "universalityContent",
  title: "Universality"
},{
  background: "modularityBackground",
  content: "modularityContent",
  title: "Modularity"
},{
  background: "nonDiscriminationBackground",
  content: "nonDiscriminationContent",
  title: "Non-Discrimination"
}], switchTo;

Template.philosophyPage.created = function(){
  Session.set("philosophyPage_slideIndex", 0);
};

var resizeBgCb = function(){},
    debouncedResize = function(){};

$(window).resize(function(){
  debouncedResize();
});

Template.philosophyPage.rendered = function(){
  var $bg = this.$(".philosophy-background"),
      $content = $(".slide-content"),
      $footer = $(".footer");

  resizeBgCb = function(){
    //this really needs to be refactored...
    var h = $(window).height() - $content.outerHeight() - $footer.outerHeight() - $bg.offset().top
          - 30;
    h = Math.max(h, 150);

    $bg.css("height", h);
    $bg.find("img").css("height", h);

    
  };

  resizeBgCb();

  debouncedResize = _.debounce(resizeBgCb, 200);
};

Template.philosophyPage.helpers({
  slide: function(){
    var i = Session.get("philosophyPage_slideIndex");

    return _.extend(slides[i], {
      prev: slides[mod(i-1, slides.length)].title,
      next: slides[mod(i+1, slides.length)].title
    });
  },
  philosophySlideHeadline: function(){
    var i = Session.get("philosophyPage_slideIndex");
  }
});

Template.philosophyPage.events({
  "click .slide-control": function(e, tmpl){
    var i = Session.get("philosophyPage_slideIndex"),
        $slide = $(".slide"),
        n = slides.length;

    if($(e.currentTarget).is(".left")){
      Session.set("philosophyPage_slideIndex", mod(i-1, n));
      $slide.data("slide-direction", "prev");
    } else if($(e.currentTarget).is(".right")) {
      Session.set("philosophyPage_slideIndex", mod(i+1, n));
      $slide.data("slide-direction", "next");
    } else {
      throw new Error("slide control direction unknown!", e.currentTarget);
    }
  }
});

Template.philosophyBackground.rendered = function(){
  resizeBgCb();
};
