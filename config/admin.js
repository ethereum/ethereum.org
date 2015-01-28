var defaultAdmin = (Meteor.settings || {}).DEFAULT_ADMIN_ACCOUNT;
AdminConfig = {
  name: "ETHEREUM",
  adminEmails: defaultAdmin ? [defaultAdmin.split(":")[0]] : [],
  nonAdminRedirectRoute: "adminSignIn",
  collections: {
    Users: {},
    Pages: {},    
    TeamMembers: {},
    News: {},
    Meetups: {}
  }
};
