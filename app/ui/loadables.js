import LoadableWrapper from '/app/ui/components/dumb/loadable-wrapper';

// We have to define the pages here so that react-loadable can see all the imports for preloading on the server
// Trying to define them inline inside the route wrappers below will fail on the server.
export const HomePage = LoadableWrapper({ loader: () => import('./pages/home-page'), moduleId: require.resolve('./pages/home-page') });
export const WelcomePage = LoadableWrapper({ loader: () => import('./pages/auth/welcome-page'), moduleId: require.resolve('./pages/auth/welcome-page') });
export const SigninPage = LoadableWrapper({ loader: () => import('./pages/auth/login-page'), moduleId: require.resolve('./pages/auth/login-page') });
export const SignupPage = LoadableWrapper({ loader: () => import('./pages/auth/signup-page'), moduleId: require.resolve('./pages/auth/signup-page') });
export const VerifyEmailPage = LoadableWrapper({ loader: () => import('./pages/auth/verify-email-page'), moduleId: require.resolve('./pages/auth/verify-email-page') });
export const LinkExpiredPage = LoadableWrapper({ loader: () => import('./pages/auth/link-expired-page'), moduleId: require.resolve('./pages/auth/link-expired-page') });
export const ForgotPasswordPage = LoadableWrapper({ loader: () => import('./pages/auth/forgot-password-page'), moduleId: require.resolve('./pages/auth/forgot-password-page') });
export const LoggedOutPage = LoadableWrapper({ loader: () => import('./pages/auth/reset-password-page'), moduleId: require.resolve('./pages/auth/reset-password-page') });
export const DataTestPage = LoadableWrapper({ loader: () => import('./pages/data-test'), moduleId: require.resolve('./pages/data-test') });
export const AdminPage = LoadableWrapper({ loader: () => import('./pages/admin/admin-page'), moduleId: require.resolve('./pages/admin/admin-page') });
export const NotFoundPage = LoadableWrapper({ loader: () => import('./pages/not-found-page'), moduleId: require.resolve('./pages/not-found-page') });
