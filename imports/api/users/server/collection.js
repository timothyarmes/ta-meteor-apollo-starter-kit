import { Meteor } from 'meteor/meteor';
import SimpleSchema from 'simpl-schema';
import Constants from '../../constants';

const collection = Meteor.users;

collection.allow({
  insert: () => false,
  update: () => false,
  remove: () => false,
});

collection.deny({
  insert: () => true,
  update: () => true,
  remove: () => true,
});

const schema = new SimpleSchema({

  createdAt: {
    type: Date,
  },

  profile: {
    type: Object,
    optional: true,
  },

  'profile.name': {
    type: String,
    max: 150,
    optional: true,
  },

  'profile.gender': {
    type: String,
    max: 50,
    optional: true,
  },

  'profile.avatar': {
    type: String,
    max: 150,
    optional: true,
  },

  emails: {
    type: Array,
    label: '[{ address, verified }, ...]',
    optional: true,
  },

  'emails.$': {
    type: Object,
  },

  'emails.$.address': {
    type: String,
    regEx: SimpleSchema.RegEx.Email,
  },

  'emails.$.verified': {
    type: Boolean,
  },

  services: {
    type: Object,
    label: 'Auth services such as facebook, google plus or twitter',
    optional: true,
    blackbox: true,
  },

  roles: {
    type: Array,
    defaultValue: [],
  },

  'roles.$': {
    type: String,
    allowedValues: Constants.ALL_ROLES,
  },

  subscriptions: {
    type: Array,
    label: 'Array of push subscriptions',
    defaultValue: [],
  },

  'subscriptions.$': {
    type: Object,
  },

  'subscriptions.$.endpoint': {
    type: String,
    label: 'Push subscription URL',
  },

  'subscriptions.$.keys': {
    type: Object,
    label: 'User encryption keys',
  },

  'subscriptions.$.keys.auth': {
    type: String,
    label: 'User public encryption key',
  },

  'subscriptions.$.keys.p256dh': {
    type: String,
    label: 'User auth secret',
  },

  // In order to avoid an 'Exception in setInterval callback' from Meteor
  heartbeat: {
    type: Date,
    optional: true,
  },

});

collection.attachSchema(schema);

export default collection;
