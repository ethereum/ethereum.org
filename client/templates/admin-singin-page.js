Template.adminSignInPage.helpers({
  alert: function(){
    return Session.get("adminSignInPage_alert");
  }
});

Template.adminSignInPage.events({
  "click [switch-mode]": function(e){
    Session.set("adminSignInPage_inSignupMode", !Session.get("adminSignInPage_inSignupMode"));
  },
  "submit form": function(e,tmpl){
    var uname = tmpl.$("[name=username]").val(),
        pass = tmpl.$("[name=password]").val();
    
    Meteor.loginWithPassword(uname, pass, function(err){
      if(err){
        Session.set("adminSignInPage_alert", {
          type: "alert-danger",
          text: err.reason
        });
      }else{
        Router.go("/admin");
      }
    });

    return false;
  }
});

