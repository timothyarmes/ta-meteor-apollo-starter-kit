import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '/imports/ui/components/smart/seo';
import withFormProps from '/imports/ui/render-props/withFormProps';
import AuthPageLayout from '/imports/ui/layouts/auth-page';
import { PasswordAuthViews } from '/imports/ui/components/smart/auth';
import Feedback from '/imports/ui/components/dumb/feedback';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const ForgotPasswordPage = ({
  disabled,
  errorMsg,
  successMsg,
  setSuccessMessage,
  handleBefore,
  handleClientError,
  handleServerError,
  handleSuccess,
}) => (
  <AuthPageLayout
    title="Forgot your Password?"
    subtitle="
      We&apos;ll send a link to your email to reset
      <br />
      your password and get you back on track.
    "
  >
    <PasswordAuthViews
      view="forgotPassword"
      btnLabel="Send Link"
      disabled={disabled}
      onBeforeHook={handleBefore}
      onClientErrorHook={handleClientError}
      onServerErrorHook={handleServerError}
      onSuccessHook={() => {
        // Extend withFormProps.handleSuccess' default functionality
        handleSuccess(() => {
          // Display success message after action is completed
          setSuccessMessage('A new email has been sent to your inbox!');
        });
      }}
    />
    <Feedback
      loading={disabled}
      errorMsg={errorMsg}
      successMsg={successMsg}
    />
    <p className="center">
      <Link to="/login">Log in</Link> | <Link to="/signup">Sign up</Link>
    </p>
  </AuthPageLayout>
);

const WrappedForgotPasswordPage = withFormProps(ForgotPasswordPage);

export default () => ([
  <SEO
    key="seo"
    schema="ForgotPassword"
    title="Forgot Password Page"
    description="A starting point for Meteor applications."
    contentType="product"
  />,

  <WrappedForgotPasswordPage key="forget" />,
]);
