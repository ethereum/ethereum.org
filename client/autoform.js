AutoForm.hooks({
  editTeamProfileForm:{
    before: {
      insert: function(doc){
        doc.next = TeamProfilesLinkedList.findNext(doc.prev);
        return doc;
      },
      update: function(id, mod){
        var doc = TeamProfiles.findOne(id) || {},
            self = this;

        //updating old prev/next

        TeamProfilesLinkedList.linkSibblings(doc, function(){
          //setting new next:
          var next = TeamProfilesLinkedList.findNext(mod.$set.prev);
          if(next && (next !== id)){
            (mod.$set = mod.$set || {}).next = next;
          } else{
            (mod.$unset = mod.$unset || {}).next = 1;
          }

          //updating new prev/next
          TeamProfilesLinkedList.updatePrevNext(id, mod.$set.prev, mod.$set.next, function(){
            self.result(mod);
          });
        });
      }
    },
    after: {
      insert: function(err, id){
        var doc = TeamProfiles.findOne(id);

        TeamProfilesLinkedList.updatePrevNext(id, doc.prev, doc.next);
      }
    },
    onSuccess: function(){
      $("#edit-team-profile-modal").modal("hide");
    }
  }
});



