import loginWithPassword from './login-with-password';
import changePassword from './change-password';
import createUser from './create-user';
import verifyEmail from './verify-email';
import sendVerificationEmail from './send-verification-email';
import forgotPassword from './forgot-password';
import resetPassword from './reset-password';
import loginWithFacebook from './login-with-facebook';
import loginWithGoogle from './login-with-google';
import loginWithLinkedIn from './login-with-linkedIn';
import logout from './logout';

const Mutation = {
  createUser,
  verifyEmail,
  sendVerificationEmail,
  forgotPassword,
  resetPassword,
  loginWithPassword,
  changePassword,
  loginWithFacebook,
  loginWithGoogle,
  loginWithLinkedIn,
  logout,
};

export default Mutation;
