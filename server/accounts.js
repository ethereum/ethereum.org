Meteor.startup(function(){
  var defaultAdmin = (Meteor.settings || {}).DEFAULT_ADMIN_ACCOUNT;

  if(defaultAdmin){
    var email = defaultAdmin.split(":")[0],
        pass = defaultAdmin.split(":")[1];
    
    if(!Meteor.users.findOne({ "emails.address": email })){
      console.log("creating a default user account for", email);

      Accounts.createUser({
        email: email,
        password: pass
      });
    };
  }else{
    console.warn("Default admin account is not set up. You will not be able to use admin. "
                 + "Please refer to the project README.");
  }
});
