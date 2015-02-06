var slides = [
  "simplicity",
  "universality",
  "modularity",
  "nonDiscrimination"
], currentSlide = slides[0];

Template.philosophyPage.helpers({
  slide: function(){
    console.log(currentSlide);
    return {
      background: currentSlide + "Background",
      content: currentSlide + "Content"
    };
  }
});
