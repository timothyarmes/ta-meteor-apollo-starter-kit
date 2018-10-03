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
import LoadableWrapper from '/app/ui/components/dumb/loadable-wrapper';

const Routes = props => (
  <ScrollToTop>
    <Switch>
      {/* HOME */}
      <LoggedInRoute
        exact
        path="/"
        component={LoadableWrapper({ loader: () => import('./pages/home-page') })}
        redirectTo="/login"
        emailNotVerifiedOverlay={LoadableWrapper({ loader: () => import('./pages/auth/welcome-page') })}
        {...props}
      />

      {/* SIGN-IN/UP */}
      <LoggedOutRoute
        name="login"
        path="/login"
        component={LoadableWrapper({ loader: () => import('./pages/auth/login-page') })}
        redirectTo="/"
        {...props}
      />

      <LoggedOutRoute
        name="signup"
        path="/signup"
        component={LoadableWrapper({ loader: () => import('./pages/auth/signup-page') })}
        redirectTo="/"
        {...props}
      />

      <RouteWithProps
        name="verifyEmail"
        path="/verify-email/:token"
        component={LoadableWrapper({ loader: () => import('./pages/auth/verify-email-page') })}
        {...props}
      />

      <RouteWithProps
        name="linkExpired"
        path="/link-expired"
        component={LoadableWrapper({ loader: () => import('./pages/auth/link-expired-page') })}
        {...props}
      />

      <LoggedOutRoute
        name="forgotPassword"
        path="/forgot-password"
        component={LoadableWrapper({ loader: () => import('./pages/auth/forgot-password-page') })}
        redirectTo="/"
        {...props}
      />

      <LoggedOutRoute
        name="resetPassword"
        path="/reset-password/:token"
        component={LoadableWrapper({ loader: () => import('./pages/auth/reset-password-page') })}
        redirectTo="/"
        {...props}
      />

      {/* ADMIN */}
      <AdminRoute
        exact
        path="/admin"
        component={LoadableWrapper({ loader: () => import('./pages/admin/admin-page') })}
        redirectTo="/login"
        {...props}
      />

      {/* NOT FOUND */}
      <Route
        component={LoadableWrapper({ loader: () => import('./pages/not-found-page') })}
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
