import React from 'react';
import { Link } from 'react-router-dom';
import { compose, setDisplayName } from 'recompose';
import { FormattedMessage as T, injectIntl } from 'react-intl';
import { withRouteProps, withFormProps, withSEO } from '/app/ui/hocs';
import AuthPageLayout from '/app/ui/layouts/auth-page';
import { PasswordAuthViews } from '/app/ui/components/smart/auth';
import Feedback from '/app/ui/components/dumb/feedback';

const ForgotPasswordPage = ({
  intl: { formatMessage: t },
  disabled,
  errorMsg,
  successMsg,
  setSuccessMessage,
  handleBefore,
  handleClientError,
  handleServerError,
  handleSuccess,
  loginUrl,
  signupUrl,
}) => (
  <AuthPageLayout
    title={t({ id: 'forgotPasswordTitle' })}
    subtitle={t({ id: 'forgotPasswordSubTitle' })}
  >
    <PasswordAuthViews
      view="forgotPassword"
      btnLabel={t({ id: 'forgotPasswordSendButton' })}
      disabled={disabled}
      onBeforeHook={handleBefore}
      onClientErrorHook={handleClientError}
      onServerErrorHook={handleServerError}
      onSuccessHook={() => {
        // Extend withFormProps.handleSuccess' default functionality
        handleSuccess(() => {
          // Display success message after action is completed
          setSuccessMessage(t({ id: 'forgotPasswordSuccessMessage' }));
        });
      }}
    />
    <Feedback
      loading={disabled}
      errorMsg={errorMsg}
      successMsg={successMsg}
    />
    <p className="center">
      <Link to={loginUrl()}><T id="authLoginLinkText" /></Link> | <Link to={signupUrl()}><T id="authSignupLinkText" /></Link>
    </p>
  </AuthPageLayout>
);

export default compose(
  injectIntl,
  withRouteProps,
  withFormProps,
  withSEO({ title: 'forgotPasswordHTMLTitle' }),
  setDisplayName('ForgotPasswordPage'),
)(ForgotPasswordPage);
