import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import Users from '/app/api/users';

const { admins } = Meteor.settings;

// Insert admin users from the settings file.
// The idea here is just to provide admin access -when the app is first executed.
// The passwords provided in the settings file should be temporary.
admins.forEach(({ email, password, roles }) => {
  const user = Users.collection.findOne({ 'emails.address': email });

  // In case user already exists, do nothing
  if (user) {
    return;
  }

  // Otherwise, insert user and set his role to 'admin'
  const userId = Accounts.createUser({ email, password });
  Meteor.users.update(userId, { $set: { roles, 'emails.0.verified': true } });
});

// OBSERVATION: use the following operation to set email to verified:
// db.users.update(
//   {_id: "yourUserId", "emails.address": "yourEmailGoesHere"},
//   {$set: {"emails.$.verified": true }}
// )
