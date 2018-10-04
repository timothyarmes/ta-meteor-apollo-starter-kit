import React from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { propType } from 'graphql-anywhere';
import userFragment from '/app/ui/apollo-client/user/fragment/user';
import { getRoute } from './get-route-label';

//------------------------------------------------------------------------------
// AUX FUNCTIONS:
//------------------------------------------------------------------------------
const getHeaderTitle = ({ curUser, route }) => {
  if (!route) {
    return 'Not Found';
  }

  if (route.auth && !curUser) {
    return 'Login';
  }

  return route.label;
};

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------

const HeaderTitle = ({ curUser, location }) => {
  // Get label for current route ('/' --> 'Home', '/b$^$%^$' --> undefined)
  const route = getRoute(location.pathname);
  // Display label based on route and user logged in state
  return <span>{getHeaderTitle({ curUser, route })}</span>;
};

HeaderTitle.propTypes = {
  curUser: propType(userFragment),
  location: PropTypes.shape({
    pathname: PropTypes.string,
  }).isRequired,
};

HeaderTitle.defaultProps = {
  curUser: null,
};

// withRouter provides access to location.pathname
export default withRouter(HeaderTitle);
