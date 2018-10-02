import { ApolloError } from 'apollo-server-express';
import { Accounts } from 'meteor/accounts-base';
import utils from '../../utils';

// Wrap collection and utils around namespace for clarity
const Users = { utils };

const sendVerificationEmail = (root, args, context) => {
  console.log('About to send verification email...');
  const { user } = context;

  Users.utils.checkLoggedInAndNotVerified(user);

  try {
    Accounts.sendVerificationEmail(user._id);
    console.log('Verification email sent!');
    return { _id: user._id };
  } catch (exc) {
    throw new ApolloError(`Verification email couldn't be delivered. Reason: ${exc.response}`);
  }
};

export default sendVerificationEmail;
