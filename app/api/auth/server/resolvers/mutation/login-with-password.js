import { ApolloError } from 'apollo-server-express';
import { callMeteorMethod, getUserLoginMethod } from '../utils';
import hashPassword from '../../../hash-password';

async function loginWithPassword(root, { username, email, password, plainPassword }, context) {
  if (!password && !plainPassword) {
    throw new Error('Password is required');
  }
  const methodArguments = {
    user: email ? { email } : { username },
    password: password || hashPassword(plainPassword),
  };

  try {
    return callMeteorMethod(context, 'login', methodArguments);
  } catch (error) {
    if (error.reason === 'User has no password set') {
      const method = getUserLoginMethod(email || username);
      if (method === 'no-password') {
        throw new ApolloError('no-password', 'User has no password set, go to forgot password');
      } else if (method) {
        throw new ApolloError(`User is registered with ${method}.`);
      } else {
        throw new ApolloError('User has no login methods');
      }
    } else {
      throw error;
    }
  }
}

export default loginWithPassword;
