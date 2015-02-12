Template.video.rendered = function(){
  this.$(".video").YouTubeModal({
    autoplay:0,
    width:640,
    height:480,
    cssClass: "ethereum-modal"
  });
};
