import { callMeteorMethod } from '../utils';

async function forgotPassword(root, { email }, { user }) {
  callMeteorMethod(user, 'forgotPassword', { email });
  return {
    success: true,
  };
}

export default forgotPassword;
