import { withHandlers } from 'recompose';
import { primaryLocale, otherLocales } from '/app/intl';

export const urlWithLocale = (locale, url) => ((locale === primaryLocale) ? url : `/${locale}${url}`);

export const toUrlWithlocale = (newLocale, location) => {
  const parts = location.pathname.split('/');

  if (otherLocales.includes(parts[1])) {
    // We have a URL in the form /locale/...
    if (newLocale === primaryLocale) {
      // Remove the locale for the primary Locale
      return `/${parts.slice(2).join('/')}${location.search}${location.hash}`;
    }

    // Replace the locale
    parts[1] = newLocale;
    return `${parts.join('/')}${location.search}${location.hash}`;
  }

  // We have a URL without a locale (must be the primary locale)
  if (newLocale === primaryLocale) return `${location.pathname}${location.search}${location.hash}`;

  return `/${newLocale}${location.pathname}${location.search}${location.hash}`;
};

// Provides functions to get the url of a given route.
// Requires `injectIntl` as a HOC for most functions, and withRouter for `toUrlWithlocale`

const withRouteProps = withHandlers({
  toUrlWithlocale: ({ location }) => newLocale => toUrlWithlocale(newLocale, location),
  urlWithLocale: ({ intl: { locale } }) => url => urlWithLocale(locale, url),
  homeUrl: ({ intl: { locale } }) => () => urlWithLocale(locale, '/'),
  loginUrl: ({ intl: { locale } }) => () => urlWithLocale(locale, '/login'),
  signupUrl: ({ intl: { locale } }) => () => urlWithLocale(locale, '/signup'),
  verifyEmailUrl: ({ intl: { locale } }) => token => urlWithLocale(locale, `/verify-email/${token || ':token'}`),
  verifyEmailExpiredUrl: ({ intl: { locale } }) => () => urlWithLocale(locale, '/link-expired'),
  resetPasswordUrl: ({ intl: { locale } }) => token => urlWithLocale(locale, `/reset-password/${token || ':token'}`),
  forgotPasswordUrl: ({ intl: { locale } }) => () => urlWithLocale(locale, '/forgot-password'),
  dataTestUrl: ({ intl: { locale } }) => () => urlWithLocale(locale, '/data-test'),
  adminUrl: ({ intl: { locale } }) => () => urlWithLocale(locale, '/admin'),
});

export default withRouteProps;
