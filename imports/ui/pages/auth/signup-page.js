import React from 'react';
import { Link } from 'react-router-dom';
import { compose } from 'recompose';
import SEO from '../../components/smart/seo';
import { withFormProps, withServiceProps } from '../../render-props';
import AuthPageLayout from '../../layouts/auth-page';
import { PasswordAuthViews, FBAuthBtn } from '../../components/smart/auth';
import Feedback from '../../components/dumb/feedback';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
// OBSERVATION: in case of facebook authentication, withFormProps.handleSuccess
// is only reachable when using 'popup' loginStyle at serviceConfiguration. On
// the contrary, when loginStyle equals 'redirect', the page will be re-loaded
// just after the response is coming back from facebook and therefore this hook
// will never be fired.

// On the other hand, after withFormProps.handleSuccess is fired, the user
// logged-in-state will change from 'logged out' to 'logged in'. This will
// trigger the LoggedOutRoute component's logic (said component wraps the
// SignupPage component) which will result in redirecting the user to home page
// automatically.

const SignupPage = ({
  disabled,
  errorMsg,
  successMsg,
  handleBefore,
  handleClientError,
  handleServerError,
  handleSuccess,
  service,
  setService,
}) => (
  <AuthPageLayout
    title="Sign Up"
    subtitle="Already have an account?&nbsp;"
    link={<Link to="/login">Log In</Link>}
  >
    <PasswordAuthViews
      view="signup"
      btnLabel="Sign Up"
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
    <div className="center">
      - OR -
    </div>
    <FBAuthBtn
      btnLabel="Sign Up with Facebook"
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

const WrappedSignupPage = compose(withFormProps, withServiceProps)(SignupPage);

export default () => ([
  <SEO
    key="seo"
    schema="SignupPage"
    title="Signup Page"
    description="A starting point for Meteor applications."
    contentType="product"
  />,

  <WrappedSignupPage key="forget" />,
]);
