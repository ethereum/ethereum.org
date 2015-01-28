Template.editTeamPage.events({
  "click [create-profile]": function(e,tmpl){
    Session.set("editTeamProfile_currentProfileId");
    $("#edit-team-profile-modal").modal("show");
  }
});
