import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import extend from 'lodash/extend';
import hashPassword from './hash-password';

/**
 * @namespace Accounts
 * @summary defines common types and scalars used across the app.
 */
const Auth = {
};

// Load client-only or client-server utilities if any

Auth.hashPassword = hashPassword;

// Load server-only utilities
if (Meteor.isServer) {
  try {
    Accounts.oauth.registerService('facebook');
    Accounts.oauth.registerService('google');
    Accounts.oauth.registerService('linkedin');
  } catch (error) {
    console.log(`Error registering login service: ${error}`);
  }

  import types from './server/types';
  import resolvers from './server/resolvers';

  extend(Auth, { types, resolvers });
}

export default Auth;
