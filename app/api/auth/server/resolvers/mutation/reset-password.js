import { callMeteorMethod } from '../utils';

async function resetPassword(root, { token, newPassword }, { user }) {
  return callMeteorMethod(user, 'resetPassword', token, newPassword);
}

export default resetPassword;
