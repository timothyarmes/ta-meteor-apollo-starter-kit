import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { propType } from 'graphql-anywhere';
import userFragment from '/app/ui/apollo-client/user/fragment/user';
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

const Routes = props => (
  <ScrollToTop>
    <Switch>
      {/* HOME */}
      <LoggedInRoute
        exact
        path="/"
        component={HomePage}
        redirectTo="/login"
        emailNotVerifiedOverlay={WelcomePage}
        {...props}
      />

      {/* SIGN-IN/UP */}
      <LoggedOutRoute
        name="login"
        path="/login"
        component={SigninPage}
        redirectTo="/"
        {...props}
      />

      <LoggedOutRoute
        name="signup"
        path="/signup"
        component={SignupPage}
        redirectTo="/"
        {...props}
      />

      <RouteWithProps
        name="verifyEmail"
        path="/verify-email/:token"
        component={VerifyEmailPage}
        {...props}
      />

      <RouteWithProps
        name="linkExpired"
        path="/link-expired"
        component={LinkExpiredPage}
        {...props}
      />

      <LoggedOutRoute
        name="forgotPassword"
        path="/forgot-password"
        component={ForgotPasswordPage}
        redirectTo="/"
        {...props}
      />

      <LoggedOutRoute
        name="resetPassword"
        path="/reset-password/:token"
        component={LoggedOutPage}
        redirectTo="/"
        {...props}
      />

      <RouteWithProps
        name="dataTest"
        path="/data-test/"
        component={DataTestPage}
        {...props}
      />

      {/* ADMIN */}
      <AdminRoute
        exact
        path="/admin"
        component={AdminPage}
        redirectTo="/login"
        {...props}
      />

      {/* NOT FOUND */}
      <Route
        component={NotFoundPage}
      />
    </Switch>
  </ScrollToTop>
);

Routes.propTypes = {
  curUser: propType(userFragment), // eslint-disable-line
};

Routes.defaultProps = {
  curUser: null,
};

export default Routes;
