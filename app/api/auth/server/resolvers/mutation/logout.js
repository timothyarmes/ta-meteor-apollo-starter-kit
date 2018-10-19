import { Accounts } from 'meteor/accounts-base';
import { getConnection } from '../utils';

async function logout(root, { token }, { user }) {
  if (token && user && user._id) {
    const hashedToken = Accounts._hashLoginToken(token);
    Accounts.destroyToken(user._id, hashedToken);
  }

  const connection = getConnection();
  Accounts._successfulLogout(connection, user._id);
  return { success: true };
}

export default logout;
