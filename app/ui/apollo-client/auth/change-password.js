import gql from 'graphql-tag';
import Auth from '/app/api/auth';

async function changePassword({ oldPassword, newPassword }, apollo) {
  if (!oldPassword || !newPassword) throw new Error('Old and new password are required');

  const result = await apollo.mutate({
    mutation: gql`
      mutation changePassword($oldPassword: HashedPassword!, $newPassword: HashedPassword!) {
        changePassword(oldPassword: $oldPassword, newPassword: $newPassword) {
          success
        }
      }
    `,
    variables: {
      oldPassword: Auth.hashPassword(oldPassword),
      newPassword: Auth.hashPassword(newPassword),
    },
  });

  const { success } = result.data.changePassword;
  return success;
}

export default changePassword;
