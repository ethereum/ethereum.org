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

Template.philosophyPage.rendered = function(){
  
};

Template.philosophyPage.helpers({
  slide: function(){
    var i = Session.get("philosophyPage_slideIndex");
    return _.extend(slides[i], {
      prev: slides[mod(i-1, slides.length)].title,
      next: slides[mod(i+1, slides.length)].title,
      switchTo: switchTo
    });
  },
  philosophySlideHeadline: function(){
    var i = Session.get("philosophyPage_slideIndex");
  }
});

Template.philosophyPage.events({
  "click .slide-control": function(e, tmpl){
    var i = Session.get("philosophyPage_slideIndex"),
        n = slides.length;
        

    if($(e.currentTarget).is(".left")){
      Session.set("philosophyPage_slideIndex", mod(i-1, n));
      switchTo = "prev";
    } else if($(e.currentTarget).is(".right")) {
      Session.set("philosophyPage_slideIndex", mod(i+1, n));
      switchTo = "next";
    } else {
      throw new Error("slide control direction unknown!", e.currentTarget);
    }
  }
});
