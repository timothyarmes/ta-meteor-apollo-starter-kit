import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { Switch, Route, withRouter } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import withRouteProps from '/app/ui/hocs/with-route-props';

import {
  ScrollToTop,
  LoggedInRoute,
  LoggedOutRoute,
  RouteWithProps,
  AdminRoute,
} from '/app/ui/components/smart/route-wrappers';

import {
  HomePage, WelcomePage, SigninPage, SignupPage, VerifyEmailPage, LinkExpiredPage,
  ForgotPasswordPage, LoggedOutPage, DataTestPage, AdminPage, NotFoundPage,
} from './loadables';

const Routes = ({
  homeUrl,
  loginUrl,
  signupUrl,
  verifyEmailUrl,
  verifyEmailExpiredUrl,
  forgotPasswordUrl,
  resetPasswordUrl,
  dataTestUrl,
  adminUrl,
  ...otherProps
}) => (
  <ScrollToTop>
    <Switch>
      {/* HOME */}
      <LoggedInRoute
        exact
        path={homeUrl()}
        component={HomePage}
        redirectTo={loginUrl()}
        emailNotVerifiedOverlay={WelcomePage}
        {...otherProps}
      />

      {/* SIGN-IN/UP */}
      <LoggedOutRoute
        name="login"
        path={loginUrl()}
        component={SigninPage}
        redirectTo={homeUrl()}
        {...otherProps}
      />

      <LoggedOutRoute
        name="signup"
        path={signupUrl()}
        component={SignupPage}
        redirectTo={homeUrl()}
        {...otherProps}
      />

      <RouteWithProps
        name="verifyEmail"
        path={verifyEmailUrl()}
        component={VerifyEmailPage}
        {...otherProps}
      />

      <Route
        path={verifyEmailExpiredUrl()}
        render={LinkExpiredPage}
        {...otherProps}
      />

      <LoggedOutRoute
        name="forgotPassword"
        path={forgotPasswordUrl()}
        component={ForgotPasswordPage}
        redirectTo={homeUrl()}
        {...otherProps}
      />

      <LoggedOutRoute
        name="resetPassword"
        path={resetPasswordUrl()}
        component={LoggedOutPage}
        redirectTo={homeUrl()}
        {...otherProps}
      />

      <RouteWithProps
        name="dataTest"
        path={dataTestUrl()}
        component={DataTestPage}
        {...otherProps}
      />

      {/* ADMIN */}
      <AdminRoute
        exact
        path={adminUrl()}
        component={AdminPage}
        redirectTo={homeUrl()}
        {...otherProps}
      />

      {/* NOT FOUND */}
      <Route
        component={NotFoundPage}
      />
    </Switch>
  </ScrollToTop>
);

Routes.propTypes = {
  match: PropTypes.object, // eslint-disable-line
  intl: intlShape.isRequired,

  homeUrl: PropTypes.func.isRequired,
  loginUrl: PropTypes.func.isRequired,
  signupUrl: PropTypes.func.isRequired,
  verifyEmailUrl: PropTypes.func.isRequired,
  verifyEmailExpiredUrl: PropTypes.func.isRequired,
  forgotPasswordUrl: PropTypes.func.isRequired,
  resetPasswordUrl: PropTypes.func.isRequired,
  dataTestUrl: PropTypes.func.isRequired,
  adminUrl: PropTypes.func.isRequired,
};

export default compose(injectIntl, withRouter, withRouteProps)(Routes);
