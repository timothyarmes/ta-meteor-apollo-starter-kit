import { Accounts } from 'meteor/accounts-base';

async function sendVerificationEmail(root, { email }, { user }) {
  Accounts.sendVerificationEmail(user._id, email);
  return {
    success: true,
  };
}

export default sendVerificationEmail;
