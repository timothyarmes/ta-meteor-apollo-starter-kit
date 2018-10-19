import React from 'react';
import PropTypes from 'prop-types';
import { compose, setDisplayName } from 'recompose';
import { Switch, Route, withRouter } from 'react-router-dom';
import { injectIntl, intlShape } from 'react-intl';
import { withRouteProps } from '/app/ui/hocs';

import {
  ScrollToTop,
  LoggedInRoute,
  LoggedOutRoute,
  RouteWithProps,
  AdminRoute,
} from '/app/ui/components/smart/route-wrappers';

import {
  HomePage, WelcomePage, LoginPage, SignupPage, VerifyEmailPage, LinkExpiredPage,
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
        path={loginUrl()}
        component={LoginPage}
        redirectTo={homeUrl()}
        {...otherProps}
      />

      <LoggedOutRoute
        path={signupUrl()}
        component={SignupPage}
        redirectTo={homeUrl()}
        {...otherProps}
      />

      <RouteWithProps
        path={verifyEmailUrl()}
        component={VerifyEmailPage}
        {...otherProps}
      />

      <RouteWithProps
        path={verifyEmailExpiredUrl()}
        component={LinkExpiredPage}
        {...otherProps}
      />

      <LoggedOutRoute
        path={forgotPasswordUrl()}
        component={ForgotPasswordPage}
        redirectTo={homeUrl()}
        {...otherProps}
      />

      <LoggedOutRoute
        path={resetPasswordUrl()}
        component={LoggedOutPage}
        redirectTo={homeUrl()}
        {...otherProps}
      />

      <RouteWithProps
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

export default compose(
  injectIntl,
  withRouter,
  withRouteProps,
  setDisplayName('Route'),
)(Routes);
