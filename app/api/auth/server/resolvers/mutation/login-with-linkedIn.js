import { HTTP } from 'meteor/http';
import { ApolloError } from 'apollo-server-express';
import { ServiceConfiguration } from 'meteor/service-configuration';

import { resolveOauthLogin } from '../utils';

function getTokens() {
  const result = ServiceConfiguration.configurations.findOne({ service: 'linkedin' });
  return {
    client_id: result.clientId,
    client_secret: result.secret,
  };
}

function getAccessToken(code, redirectUri) {
  const response = HTTP.post('https://www.linkedin.com/oauth/v2/accessToken', {
    params: {
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      ...getTokens(),
    },
  }).data;

  return response.access_token;
}

function getIdentity(accessToken) {
  try {
    return HTTP.get('https://www.linkedin.com/v1/people/~:(id,email-address,first-name,last-name,headline)', {
      params: {
        oauth2_access_token: accessToken,
        format: 'json',
      },
    }).data;
  } catch (err) {
    throw new ApolloError(`Failed to fetch identity from LinkedIn. ${err.message}`);
  }
}

function loginWithLinkedIn({ code, redirectUri }) {
  // works with anything also...
  const accessToken = getAccessToken(code, redirectUri);
  const identity = getIdentity(accessToken);

  const serviceData = {
    ...identity,
    accessToken,
  };

  return {
    serviceName: 'linkedin',
    serviceData,
    options: { profile: { name: `${identity.firstName} ${identity.lastName}` } },
  };
}

export default resolveOauthLogin(loginWithLinkedIn);
