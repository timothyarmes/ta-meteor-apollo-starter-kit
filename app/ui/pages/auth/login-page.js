import React from 'react';
import { Link } from 'react-router-dom';
import withSEO from '/app/ui/hocs/with-seo';
import { compose } from 'recompose';
import { FormattedMessage as T, injectIntl } from 'react-intl';
import { withRouteProps, withFormProps, withServiceProps } from '/app/ui/hocs/';
import AuthPageLayout from '/app/ui/layouts/auth-page';
import { PasswordAuthViews, FBAuthBtn } from '/app/ui/components/smart/auth';
import Feedback from '/app/ui/components/dumb/feedback';

// OBSERVATION: in case of facebook authentication, withFormProps.handleSuccess
// is only reachable when using 'popup' loginStyle at serviceConfiguration. On
// the contrary, when loginStyle equals 'redirect', the page will be re-loaded
// just after the response is coming back from facebook and therefore this hook
// will never be fired.

// On the other hand, after withFormProps.handleSuccess is fired, the user
// logged-in-state will change from 'logged out' to 'logged in'. This will
// trigger the LoggedOutRoute component's logic (said component wraps the
// LoginPage component) which will result in redirecting the user to home page
// automatically.

const LoginPage = ({
  intl: { formatMessage: t },
  disabled,
  errorMsg,
  successMsg,
  handleBefore,
  handleClientError,
  handleServerError,
  handleSuccess,
  service,
  setService,
  signupUrl,
  forgotPasswordUrl,
}) => (
  <AuthPageLayout
    title={t({ id: 'loginTitle' })}
    subtitle={t({ id: 'loginSubtitle' })}
    link={<Link to={signupUrl()}><T id="authSignupLinkText" /></Link>}
  >
    <PasswordAuthViews
      view="login"
      btnLabel={t({ id: 'loginLoginPWButton' })}
      disabled={disabled}
      onBeforeHook={() => {
        // Keep track of the auth service being used
        setService('password');
        handleBefore();
      }}
      onClientErrorHook={handleClientError}
      onServerErrorHook={handleServerError}
      onSuccessHook={handleSuccess}
    />
    {service === 'password' && (
      <Feedback
        loading={disabled}
        errorMsg={errorMsg}
        successMsg={successMsg}
      />
    )}
    <p className="center">
      <Link to={forgotPasswordUrl()}><T id="authForgotPasswordLinkText" /></Link>
    </p>
    <div className="center">
      <T id="signupOrText" />
    </div>
    <FBAuthBtn
      btnLabel={t({ id: 'loginLoginFBButton' })}
      disabled={disabled}
      onBeforeHook={() => {
        // Keep track of the auth service being used
        setService('facebook');
        handleBefore();
      }}
      onServerErrorHook={handleServerError}
      onSuccessHook={handleSuccess}
    />
    {service === 'facebook' && (
      <Feedback
        loading={disabled}
        errorMsg={errorMsg}
        successMsg={successMsg}
      />
    )}
  </AuthPageLayout>
);

export default compose(
  injectIntl,
  withRouteProps,
  withFormProps,
  withServiceProps,
  withSEO({ title: 'loginHTMLTitle' }),
)(LoginPage);
