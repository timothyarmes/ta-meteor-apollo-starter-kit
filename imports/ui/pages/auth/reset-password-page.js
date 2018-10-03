import React from 'react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';
import { compose } from 'recompose';
import AuxFunctions from '/imports/api/aux-functions';
import SEO from '/imports/ui/components/smart/seo';
import withFormProps from '/imports/ui/render-props/withFormProps';
import AuthPageLayout from '/imports/ui/layouts/auth-page';
import { PasswordAuthViews } from '/imports/ui/components/smart/auth';
import Feedback from '/imports/ui/components/dumb/feedback';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// OBSERVATION: after withFormProps.handleSuccess is fired, the user
// logged-in-state will change from 'logged out' to 'logged in'. This will
// trigger the LoggedOutRoute component's logic (said component wraps the
// LoginPage component) which will result in redirecting the user to home page
// automatically.
const ResetPasswordPage = ({
  match,
  disabled,
  errorMsg,
  successMsg,
  handleBefore,
  handleClientError,
  handleServerError,
  handleSuccess,
}) => {
  const token = (match && match.params && match.params.token) || '';

  return (
    <AuthPageLayout title="Reset your Password">
      <PasswordAuthViews
        view="resetPassword"
        btnLabel="Reset Password"
        token={token}
        disabled={disabled}
        onBeforeHook={handleBefore}
        onClientErrorHook={handleClientError}
        onServerErrorHook={handleServerError}
        onSuccessHook={() => {
          // Extend withFormProps.handleSuccess' default functionality
          handleSuccess(() => {
            // Display alert message after action is completed
            AuxFunctions.delayedAlert('Password reset successfully!', 700);
          });
        }}
      />
      <Feedback
        loading={disabled}
        errorMsg={errorMsg}
        successMsg={successMsg}
      />
      <p className="center">
        <Link to="/forgot-password">Resend reset password link</Link>
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

const WrappedResetPasswordPage = compose(withFormProps, withRouter)(ResetPasswordPage);

export default () => ([
  <SEO
    key="seo"
    schema="AboutPage"
    title="Reset Password Page"
    description="A starting point for Meteor applications."
    contentType="product"
  />,

  <WrappedResetPasswordPage key="resetPassword" />,
]);
