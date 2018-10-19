import { Meteor } from 'meteor/meteor';
import { Random } from 'meteor/random';
import { ApolloError } from 'apollo-server-express';
import { Accounts } from 'meteor/accounts-base';
import { OAuth } from 'meteor/oauth';

export const getConnection = () => ({
  id: Random.id(),
  close: () => {},
});

export function callMeteorMethod(user, name, ...args) {
  const handler = Meteor.server.method_handlers[name];
  if (!handler) {
    throw new Meteor.Error(404, `Method '${name}' not found`);
  }

  const connection = getConnection();
  const context = {
    connection,
    setUserId() {}, // Required by meteor method handlers
    userId: user ? user._id : null,
  };

  return handler.call(context, ...args);
}

export function getUserLoginMethod(emailOrUsername) {
  if (!emailOrUsername) return 'unknown';

  const { services } = emailOrUsername.indexOf('@') !== -1 ? Accounts.findUserByEmail(emailOrUsername) : Accounts.findUserByUsername(emailOrUsername);
  const list = Object.keys(services).reduce((acc, key) => {
    if (key === 'email') return acc;
    if (key === 'resume') return acc;
    if (key === 'password' && !services.password.bcrypt) return [...acc, 'no-password'];
    return [...acc, key];
  });

  const allowedServices = [...Accounts.oauth.serviceNames(), 'password'];
  return list.filter(service => allowedServices.includes(service)).join(', ');
}

export function resolveOauthLogin(handleAuthFromAccessToken) {
  return async (root, params, context) => {
    const oauthResult = handleAuthFromAccessToken(params);
    // Why any token works? :/
    const credentialToken = Random.secret();
    const credentialSecret = Random.secret();

    OAuth._storePendingCredential(credentialToken, oauthResult, credentialSecret);

    const oauth = { credentialToken, credentialSecret };
    try {
      return callMeteorMethod(context, 'login', { oauth });
    } catch (error) {
      if (error.reason === 'Email already exists.') {
        const email = oauthResult.serviceData.email || oauthResult.serviceData.emailAddress;
        const method = getUserLoginMethod(email);
        if (method === 'no-password') {
          throw new ApolloError('User has no password set, go to forgot password');
        } else if (method) {
          throw new ApolloError(`User is registered with ${method}.`);
        } else {
          throw new ApolloError('User has no login methods');
        }
      } else {
        throw error;
      }
    }
  };
}
