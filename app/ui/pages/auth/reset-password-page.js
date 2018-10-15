import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'recompose';
import AuxFunctions from '/app/api/aux-functions';
import { FormattedMessage as T, injectIntl } from 'react-intl';
import { withRouteProps, withFormProps, withSEO } from '/app/ui/hocs';
import AuthPageLayout from '/app/ui/layouts/auth-page';
import { PasswordAuthViews } from '/app/ui/components/smart/auth';
import Feedback from '/app/ui/components/dumb/feedback';

// OBSERVATION: after withFormProps.handleSuccess is fired, the user
// logged-in-state will change from 'logged out' to 'logged in'. This will
// trigger the LoggedOutRoute component's logic (said component wraps the
// LoginPage component) which will result in redirecting the user to home page
// automatically.

const ResetPasswordPage = ({
  intl: { formatMessage: t },
  match,
  disabled,
  errorMsg,
  successMsg,
  handleBefore,
  handleClientError,
  handleServerError,
  handleSuccess,
  forgotPasswordUrl,
}) => {
  const token = (match && match.params && match.params.token) || '';

  return (
    <AuthPageLayout title={t({ id: 'resetPasswordTitle' })}>
      <PasswordAuthViews
        view="resetPassword"
        btnLabel={t({ id: 'resetPasswordResetButton' })}
        token={token}
        disabled={disabled}
        onBeforeHook={handleBefore}
        onClientErrorHook={handleClientError}
        onServerErrorHook={handleServerError}
        onSuccessHook={() => {
          // Extend withFormProps.handleSuccess' default functionality
          handleSuccess(() => {
            // Display alert message after action is completed
            AuxFunctions.delayedAlert(t({ id: 'resetPasswordSuccessMessage ' }), 700);
          });
        }}
      />
      <Feedback
        loading={disabled}
        errorMsg={errorMsg}
        successMsg={successMsg}
      />
      <p className="center">
        <Link to={forgotPasswordUrl}><T id="resetPasswordResendLinkText" /></Link>
      </p>
    </AuthPageLayout>
  );
};

ResetPasswordPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string,
    }).isRequired,
  }).isRequired,
};

export default compose(
  injectIntl,
  withRouteProps,
  withFormProps,
  withRouter,
  withSEO({ title: 'resetPasswordHTMLTitle' }),
)(ResetPasswordPage);
