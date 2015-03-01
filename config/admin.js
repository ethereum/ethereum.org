var defaultAdmin = (Meteor.settings || {}).DEFAULT_ADMIN_ACCOUNT;

AdminConfig = {
  name: "ETHEREUM",
  adminEmails: defaultAdmin ? [defaultAdmin.split(":")[0]] : [],
  nonAdminRedirectRoute: "signIn",
  collections: {
    Meetups: {
      tableColumns: [
        { label: "City", name: "city" },
        { label: "URL", name: "url" },
        { label: "Featured", name: "featured" }
      ]
    },
    FeaturedProjects: {
      tableColumns: [
        { label: "Name", name: "name" }
      ]
    },
    FeaturedIn: {
      tableColumns: [
        { label: "URL", name: "url" }
      ]
    },
    TeamProfiles: {
      tableColumns: [
        { label: "Name", name: "name" }
      ]
    },
    TeamProfileSortOrder: {},
    PressReleases: {
      tableColumns: [
        { label: "Title", name: "title"},
        { label: "Date", name: "publishedAt" }
      ],
      omitFields: ["publishedAt"]
    },
    Blurboids: {
      tableColumns: [
        {label: "Text", name: "text"}
      ]
    }
  }
};
