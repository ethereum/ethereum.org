AutoForm.hooks({
  editTeamProfileForm:{
    before: {
      insert: function(doc){
        doc.next = findNext(doc.prev);
        return doc;
      },
      update: function(id, mod){
        var doc = TeamProfiles.findOne(id) || {};

        //updating old prev/next
        if(doc.prev) {
          if(doc.next){
            TeamProfiles.update({_id: doc.prev}, {$set: {next: doc.next}});
          }else{
            TeamProfiles.update({_id: doc.prev}, {$unset: {next: 1}});
          }
        }
        if(doc.next){
          if(doc.prev){
            TeamProfiles.update({_id: doc.next}, {$set: {prev: doc.next}});
          }else{
            TeamProfiles.update({_id: doc.next}, {$unset: {prev: doc.next}});
          }
        } 

        //setting new next:
        var next = findNext(mod.$set.prev);
        if(next && (next !== id)){
          mod.$set.next = next;
        } else{
          mod.$unset.next = 1;
        }

        //updating new prev/next
        updatePrevNext(id, mod.$set.prev, mod.$set.next);
        
        return mod;
      }
    },
    after: {
      insert: function(err, id){
        var doc = TeamProfiles.findOne(id);

        TeamProfiles.update({
          _id: doc.next && TeamProfiles.findOne(doc.next)._id
        }, {$set: {prev: id}});

        TeamProfiles.update({
          _id: doc.prev && TeamProfiles.findOne(doc.prev)._id
        }, {$set: {next: id}});

      }
    },
    onSuccess: function(){
      $("#edit-team-profile-modal").modal("hide");
    }
  }
});

function findNext(prev){
  return (TeamProfiles.findOne({ prev: prev }) || {})._id;
}

function updatePrevNext(id, prev, next){
  if(prev) TeamProfiles.update({_id: prev}, {$set: {next: id}});
  if(next) TeamProfiles.update({_id: next}, {$set: {prev: id}});
}
