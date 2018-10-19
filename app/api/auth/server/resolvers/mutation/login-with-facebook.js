import { HTTP } from 'meteor/http';
import { ApolloError } from 'apollo-server-express';
import { resolveOauthLogin } from '../utils';

function getIdentity(accessToken) {
  const fields = ['id', 'email', 'name', 'first_name', 'last_name', 'link', 'gender', 'locale', 'age_range'];
  try {
    return HTTP.get('https://graph.facebook.com/v3.1/me', {
      params: {
        access_token: accessToken,
        fields: fields.join(','),
      },
    }).data;
  } catch (err) {
    throw new ApolloError(`Failed to fetch identity from Facebook. ${err.message}`);
  }
}

function loginWithFacebook({ accessToken }) {
  const identity = getIdentity(accessToken);

  const serviceData = {
    ...identity,
    accessToken,
  };

  return {
    serviceName: 'facebook',
    serviceData,
    options: { profile: { name: identity.name } },
  };
}

export default resolveOauthLogin(loginWithFacebook);
