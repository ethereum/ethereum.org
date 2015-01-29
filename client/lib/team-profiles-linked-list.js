TeamProfilesLinkedList = {
  findNext: function(prev){
    return (TeamProfiles.findOne({ prev: prev }) || {})._id;
  },
  linkSibblings: function(doc, cb){
    console.log("link sibblings doc:", doc);
    async.series([
      function(done){
        if(doc.prev) {
          if(doc.next){
            console.log("prev next", {_id: doc.prev}, {$set: {next: doc.next}});
            TeamProfiles.update({_id: doc.prev}, {$set: {next: doc.next}}, done);
          }else{
            console.log("no prev next");
            TeamProfiles.update({_id: doc.prev}, {$unset: {next: 1}}, done);
          }
        } else { done(); }
      },
      function(done){
        if(doc.next){
          console.log("next",doc.next);
          if(doc.prev){
            console.log("next prev", doc.prev);
            console.log("update:",{_id: doc.next}, {$set: {prev: doc.prev}});
            TeamProfiles.update({_id: doc.next}, {$set: {prev: doc.prev}}, done);
          }else{
            console.log("no next prev");
            console.log({_id: doc.next}, {$unset: {prev: doc.next}});
            TeamProfiles.update({_id: doc.next}, {$unset: {prev: 1}}, done);
          }
        } else { done(); }
      }
    ], cb);
  },
  updatePrevNext: function(id, prev, next, cb){
    async.series([
      function(done){
        if(prev){
          TeamProfiles.update({_id: prev}, {$set: {next: id}}, done);
        } else { done(); }
      },
      function(done){
        if(next){
          TeamProfiles.update({_id: next}, {$set: {prev: id}}, done);
        } else { done(); }
      }
    ], cb);
  }
};

