var currentProfile;

Template.editTeamProfileModal.rendered = function(){
  AutoForm.resetForm("editTeamProfileForm");
};

Template.editTeamProfileModal.helpers({
  currentProfile: currentProfile = function(){
    var id = Session.get("editTeamProfile_currentProfileId");
    return id && TeamProfiles.findOne(id);
  },
  formType: function(){
    return currentProfile() ? "update" : "insert";
  },
  insertAfterOptions: function(){
    return lodash(this.teamProfiles).reject({
      _id: Session.get("editTeamProfile_currentProfileId")
    }).map(function(prof){
      return {
        label: prof.name,
        value: prof._id
      };
    }).value();
  }
});

Template.editTeamProfileModal.helpers({
  
});
