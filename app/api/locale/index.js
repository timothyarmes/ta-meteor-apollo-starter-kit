import { Meteor } from 'meteor/meteor';
import extend from 'lodash/extend';

/**
 * @namespace Base
 * @summary defines common types and scalars used across the app.
 */
const Locale = {};

// Load client-only or client-server utilities if any

// Load server-only utilities
if (Meteor.isServer) {
  import types from './server/types';
  import resolvers from './server/resolvers';

  extend(Locale, { types, resolvers });
}

export default Locale;
