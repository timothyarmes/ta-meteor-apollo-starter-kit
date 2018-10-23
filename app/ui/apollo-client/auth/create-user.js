import gql from 'graphql-tag';
import Auth from '/app/api/auth';
import { storeLoginToken } from './store';

async function createUser({ username, email, password, profile }, apollo) {
  const result = await apollo.mutate({
    mutation: gql`
      mutation createUser ($username: String, $email: String, $password: HashedPassword!, $profile: CreateUserProfileInput) {
        createUser (username: $username, email: $email, password: $password, profile: $profile) {
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
      profile,
    },
  });

  const { id, token, tokenExpires } = result.data.createUser;
  await storeLoginToken(id, token, new Date(tokenExpires));
  return id;
}

export default createUser;
