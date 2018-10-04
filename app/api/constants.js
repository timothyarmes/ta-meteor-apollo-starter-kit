/**
 * @namespace Constants
 * @summary constants used across the app.
 */
const Constants = {
  SITE_BRAND: 'yourBrand',
  DOMAIN_NAME: 'yourbrand.com',
  SUPPORT_EMAIL: 'support@yourbrand.com',
  SITE_TWITTER: '@yourBrand',
  AUTH_SERVICES: ['password', 'facebook'],
  ALL_ROLES: ['admin', 'normal'],
  ROUTES: [
    { path: '/', label: 'Home', menu: true, auth: true },
    { path: '/data-test', label: 'Data test', menu: true },
    { path: '/admin', label: 'Admin', menu: true, admin: true },

    { path: '/login', label: 'Login' },
    { path: '/signup', label: 'Signup' },
    { path: '/verify-email', label: 'Verify Email' },
    { path: '/link-expired', label: 'Link Expired' },
    { path: '/forgot-password', label: 'Forgot Password' },
    { path: '/reset-password', label: 'Reset Password' },
  ],
};

export default Constants;
