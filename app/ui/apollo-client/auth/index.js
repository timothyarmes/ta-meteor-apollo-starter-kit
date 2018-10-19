import changePassword from './change-password';
import createUser from './create-user';
import forgotPassword from './forgot-password';
import loginWithPassword from './login-with-password';
import logout from './logout';
import sendVerificationEmail from './send-verification-email';
import resetPassword from './reset-password';
import verifyEmail from './verify-email';
import loginWithFacebook from './login-with-facebook';
import loginWithGoogle from './login-with-google';
import loginWithLinkedIn from './login-with-linkedIn';
import userId from './userId';
import { onTokenChange, getLoginToken, setTokenStore } from './store';

export {
  changePassword,
  createUser,
  forgotPassword,
  getLoginToken,
  loginWithPassword,
  logout,
  sendVerificationEmail,
  resetPassword,
  verifyEmail,
  loginWithFacebook,
  loginWithGoogle,
  loginWithLinkedIn,
  onTokenChange,
  setTokenStore,
  userId,
};
