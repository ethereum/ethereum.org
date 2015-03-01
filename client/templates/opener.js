var _ = lodash,
    UPDATE_INTERVAL = 7000;

Template.opener.rendered = function(){
  var randomBlurb = function(curId){
    return _(Blurboids.find().fetch()).filter(function(item){
      return item._id !== curId && !item.appearAfter;
    }).sample();
  }, update = function(){
    var cur = Session.get("currentBlurboid"),
        next = cur && _.findWhere(Blurboids.find({appearAfter: {$exists: true}}).fetch(), {
          appearAfter: cur._id
        });

    Session.set("currentBlurboid", next ? next : randomBlurb((cur || {})._id));
  };

  this._updateInterval = setInterval(update,UPDATE_INTERVAL);

  update();
};

Template.opener.destroyed = function(){
  clearInterval(this._updateInterval);
};

Template.opener.helpers({
  blurboids: function(){
    return [Session.get("currentBlurboid")]; //as an array to allow momentum do it's magic
  }
});
