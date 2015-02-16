var defaultAdmin = (Meteor.settings || {}).DEFAULT_ADMIN_ACCOUNT;

AdminConfig = {
  name: "ETHEREUM",
  adminEmails: defaultAdmin ? [defaultAdmin.split(":")[0]] : [],
  nonAdminRedirectRoute: "adminSignIn",
  collections: {
    Users: {},
    Meetups: {
      tableColumns: [
        {label: "City", name: "city"},
        {label: "URL", name: "url"},
        {label: "Featured", name: "featured"}
      ]
    },
    FeaturedProjects: {},
    FeaturedIn: {}
  },
  dashboard: {
  }
};
