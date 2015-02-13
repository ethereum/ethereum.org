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

Template.philosophySlides.created = function(){
  Session.set("philosophySlides_slideIndex", 0);
};


Template.philosophySlides.helpers({
  slide: function(){
    var i = Session.get("philosophySlides_slideIndex");

    return _.extend(slides[i], {
      prev: slides[mod(i-1, slides.length)].title,
      next: slides[mod(i+1, slides.length)].title
    });
  },
  philosophySlideHeadline: function(){
    var i = Session.get("philosophySlides_slideIndex");
  }
});

Template.philosophySlides.events({
  "click .slide-control": function(e, tmpl){
    var i = Session.get("philosophySlides_slideIndex"),
        $slide = $(".slide"),
        n = slides.length;

    if($(e.currentTarget).is(".left")){
      Session.set("philosophySlides_slideIndex", mod(i-1, n));
      $slide.data("slide-direction", "prev");
    } else if($(e.currentTarget).is(".right")) {
      Session.set("philosophySlides_slideIndex", mod(i+1, n));
      $slide.data("slide-direction", "next");
    } else {
      throw new Error("slide control direction unknown!", e.currentTarget);
    }
  }
});

