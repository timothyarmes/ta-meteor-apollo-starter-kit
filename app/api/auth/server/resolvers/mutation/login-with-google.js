import { HTTP } from 'meteor/http';
import { ApolloError } from 'apollo-server-express';
import { resolveOauthLogin } from '../utils';

function getIdentity(accessToken) {
  try {
    return HTTP.get('https://www.googleapis.com/oauth2/v1/userinfo', { params: { access_token: accessToken } }).data;
  } catch (err) {
    throw new ApolloError(`Failed to fetch identity from Google. ${err.message}`);
  }
}

function getScopes(accessToken) {
  try {
    return HTTP.get('https://www.googleapis.com/oauth2/v1/tokeninfo', { params: { access_token: accessToken } }).data.scope.split(' ');
  } catch (err) {
    throw new ApolloError(`Failed to fetch tokeninfo from Google. ${err.message}`);
  }
}

function loginWithGoogle({ accessToken }) {
  const scopes = getScopes(accessToken);
  const identity = getIdentity(accessToken);

  const serviceData = {
    ...identity,
    accessToken,
    scopes,
  };

  return {
    serviceName: 'google',
    serviceData,
    options: { profile: { name: identity.name } },
  };
}

export default resolveOauthLogin(loginWithGoogle);
