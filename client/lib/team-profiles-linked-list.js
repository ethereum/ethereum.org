TeamProfilesLinkedList = {
  findNext: function(prev){
    return (TeamProfiles.findOne({ prev: prev }) || {})._id;
  },
  linkSibblings: function(doc, cb){
    async.series([
      function(done){
        if(doc.prev) {
          if(doc.next){
            TeamProfiles.update({_id: doc.prev}, {$set: {next: doc.next}}, done);
          }else{
            TeamProfiles.update({_id: doc.prev}, {$unset: {next: 1}}, done);
          }
        } else { done(); }
      },
      function(done){
        if(doc.next){
          if(doc.prev){
            TeamProfiles.update({_id: doc.next}, {$set: {prev: doc.prev}}, done);
          }else{
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

