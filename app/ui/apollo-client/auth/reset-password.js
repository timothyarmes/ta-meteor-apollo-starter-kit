import gql from 'graphql-tag';
import { storeLoginToken } from './store';
import Auth from '/app/api/auth';

async function resetPassword({ newPassword, token }, apollo) {
  const result = await apollo.mutate({
    mutation: gql`mutation resetPassword($newPassword: HashedPassword!, $token: String!) {
      resetPassword(newPassword: $newPassword, token: $token) {
        id
        token
        tokenExpires
      }
    }`,
    variables: {
      newPassword: Auth.hashPassword(newPassword),
      token,
    },
  });

  const { id, token: loginToken, tokenExpires } = result.data.resetPassword;
  await storeLoginToken(id, loginToken, new Date(tokenExpires));
  return id;
}

export default resetPassword;
