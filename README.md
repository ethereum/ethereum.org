[![wercker status](https://app.wercker.com/status/538e72d657626c989c8e03811c9b2513/m/master "wercker status")](https://app.wercker.com/project/bykey/538e72d657626c989c8e03811c9b2513)

# Ethereum.org site

The main Ethereum website built with [Meteor](https://www.meteor.com/).

Find out more:

https://ethereum.org

http://wiki.ethdev.com

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
