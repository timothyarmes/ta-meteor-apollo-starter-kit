import { Meteor } from 'meteor/meteor';
import omit from 'lodash/omit';
import { callMeteorMethod } from '../utils';
import hashPassword from '../../../hash-password';

async function createUser(root, options, { user }) {
  Meteor._nodeCodeMustBeInFiber();
  if (!options.password && !options.plainPassword) {
    throw new Error('Password is required');
  }

  const newOptions = omit(options, 'plainPassword');
  if (!newOptions.password) {
    newOptions.password = hashPassword(options.plainPassword);
  }

  return callMeteorMethod(user, 'createUser', newOptions);
}

export default createUser;
