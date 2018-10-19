import gql from 'graphql-tag';
import { getLoginToken, resetStore } from './store';

async function logout(apollo) {
  const token = await getLoginToken();
  if (!token) return;

  await apollo.mutate({
    mutation: gql`
      mutation logout($token: String!) {
        logout(token: $token) {
          success
        }
      }
    `,
    variables: {
      token,
    },
  });

  // Remove the login token from local storage
  await resetStore();
}

export default logout;
