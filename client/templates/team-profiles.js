Template.teamProfiles.events({
  "click [edit-profile]": function(e,tmpl){
    Session.set("editTeamProfile_currentProfileId", $(e.currentTarget).data("id"));
    $("#edit-team-profile-modal").modal("show");
  }
});
