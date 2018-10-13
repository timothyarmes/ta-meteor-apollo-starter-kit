
// Main application strings

const app = {
  langsEn: 'en',
  langsFr: 'fr',

  emailLabel: 'Email',
  emailRequiredError: 'Email is required',
  invalidEmailError: 'Please, provide a valid email address!',
  maxEmailLengthError: 'Must be no more than {num, plural, one {# character} other {# characters}}!',
  passwordRequireError: 'Password is required',
  passwordLabel: 'Password',
  passwordTooShortError: 'Please, at least {num, plural, one {# character} other {# characters}} long!',
  passwordTooLongError: 'Must be no more than {num, plural, one {# character} other {# characters}} long!',

  pushEnableButton: 'Enable Pushed Messages',
  pushDisableButton: 'Disable Push Messages',
  pushPermissionDeniedError: 'Permission for Notifications was denied',
  pushSubscribtionFailedError: 'Unable to subscribe to push:',
  pushUnsubscribeError: 'Error thrown while unsubscribing from push messaging:',

  siteHTMLDescription: 'A starting point for Meteor applications.',

  authLoginLinkText: 'Log in',
  authSignupLinkText: 'Sign up',
  authForgotPasswordLinkText: 'Forgot password?',
  authLogoutButton: 'Log out',

  signupHTMLTitle: 'Sign Up',
  signupTitle: 'Sign Up',
  signupSubTitle: 'Already have an account?\u00a0',
  signupPWButton: 'Sign Up',
  signupFBButton: 'Sign Up with Facebook',
  signupOrText: '- OR -',

  loginHTMLTitle: 'Log In',
  loginTitle: 'Log In',
  loginSubtitle: "Don't have an account?\u00a0",
  loginLoginPWButton: 'Log In',
  loginLoginFBButton: 'Log In with Facebook',

  verifyEmailHTMLDescription: 'Verify Email',
  verifyEmailSuccessMessage: 'Account verified successfully. Thanks!',

  forgotPasswordHTMLTitle: 'Forgot Password',
  forgotPasswordTitle: 'Forgot your Password?',
  forgotPasswordSubTitle: "We'll send a link to your email to reset<br />your password and get you back on track.",
  forgotPasswordSendButton: 'Send Link',
  forgotPasswordSuccessMessage: 'A new email has been sent to your inbox!',

  resetPasswordHTMLTitle: 'Reset your Password',
  resetPasswordTitle: 'Reset your Password',
  resetPasswordResetButton: 'Reset Password',
  resetPasswordResendLinkText: 'Resend reset password link',
  resetPasswordSuccessMessage: 'Password reset successfully!',

  linkExpiredHTMLTitle: 'Link Expired',
  linkExpiredTitle: 'The link has expired!',
  linkExpiredResendLinkText: 'here',
  linkExpiredResendLinkMessage: 'Please, click {resendLink} to resend confirmation link.',
  linkExpiredLoginLinkText: 'login',
  linkExpiredLoginLinkMessage: 'Please, {loginLink} to be able to resend confirmation link.',
  linkExpiredLinkSent: 'A new email has been sent to your inbox!',

  welcomeHTMLTitle: 'Welcome!',
  welcomeEmailSentMessage: 'A new email has been sent to your inbox!',
  welcomeCheckEmailMessage: 'Check your email and click on the link provided to confirm your account.',
  welcomeDidNotReceiveLinkText: 'here',
  welcomeDidNotReceiveMessage: 'If you did not receive an email, click {resendLink} to resend the confirmation link.',

  notFoundHTMLTitle: 'Page Not Found',
  notFoundTitle: '404 - Page Not Found',
  notFoundSubTitle: 'Back to',
  notFoundHomeLinkText: 'Home',

  homeHTMLTitle: 'Home',
  homeHeaderTitle: 'TA Meteor Starter Kit',
  homeNoServiceWorkerError: "Your browser doesn't support service workers",

  dataTestHTMLTitle: 'Data Test',
  dataTestTitle: 'Data Test',
  dataTestReturned: 'Data returned after 2 seconds',

  adminHeaderTitle: 'Admin Page :)',
};

// Admin strings

const admin = {
  adminHTMLTitle: 'Admin Page',
  adminTitle: 'This is your admin area',
};

export default { app, admin };
