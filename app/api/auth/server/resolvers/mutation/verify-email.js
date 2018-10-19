import { callMeteorMethod } from '../utils';

async function verifyEmail(root, { token }, { user }) {
  return callMeteorMethod(user, 'verifyEmail', token);
}

export default verifyEmail;
