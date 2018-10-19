import gql from 'graphql-tag';
import Auth from '/app/api/auth';
import { storeLoginToken } from './store';

async function loginWithPassword({ username, email, password }, apollo) {
  const result = await apollo.mutate({
    mutation: gql`
    mutation login ($username: String, $email: String, $password: HashedPassword!) {
      loginWithPassword (username: $username, email: $email, password: $password) {
        id
        token
        tokenExpires
      }
    }
    `,
    variables: {
      username,
      email,
      password: Auth.hashPassword(password),
    },
  });

  const { id, token, tokenExpires } = result.data.loginWithPassword;
  await storeLoginToken(id, token, new Date(tokenExpires));
  return id;
}

export default loginWithPassword;
