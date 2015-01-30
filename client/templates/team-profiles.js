Template.teamProfiles.events({
  "click [edit-profile]": function(e,tmpl){
    //.data("id") sometimes returns wrong id. probably a meteor bug
    Session.set("editTeamProfile_currentProfileId", $(e.currentTarget).attr("data-id"));
    $("#edit-team-profile-modal").modal("show");
  }
});
