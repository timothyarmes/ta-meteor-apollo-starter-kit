import { callMeteorMethod } from '../utils';

async function changePassword(root, { oldPassword, newPassword }, { user }) {
  return callMeteorMethod(user, 'changePassword', oldPassword, newPassword);
}

export default changePassword;
