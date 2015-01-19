# Ethereum.org site

##Admin
In order for admin to work you'll need to set up a default admin user. To do that add a setting file e.g `config/settings.json` (must be gitignored) with the contents similar to:
```json
{
  "DEFAULT_ADMIN_ACCOUNT": "<email>:<password>"
}
```

Then start Meteor with
```
meteor --settings config/settings.json
```
