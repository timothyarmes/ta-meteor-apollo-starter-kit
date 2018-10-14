import React from 'react';
import { Link } from 'react-router-dom';
import { Roles } from 'meteor/alanning:roles';
import { propType } from 'graphql-anywhere';
import { compose } from 'recompose';
import { injectIntl } from 'react-intl';
import userFragment from '/app/ui/apollo-client/user/fragment/user';
import { withGlobalContextProps } from '/app/ui/hocs';
import { withRouteProps } from '/app/ui/hocs';
import { LogoutBtn } from './auth';

const Menu = ({ curUser, homeUrl, dataTestUrl, adminUrl }) => {
  // Only display menu content for logged in users
  if (!curUser) {
    return null;
  }

  const menuRoutes = [
    { path: homeUrl(), label: 'Home', menu: true, auth: true },
    { path: dataTestUrl(), label: 'Data test', menu: true },
  ];

  if (Roles.userIsInRole(curUser._id, ['admin'])) {
    menuRoutes.push({ path: adminUrl(), label: 'Admin', menu: true, admin: true });
  }

  // Display menu routes plus logout button
  return [
    menuRoutes.map(({ path, label }) => (
      <li key={path}>
        <Link to={path} onClick={window.hideMenu}>
          {label}
        </Link>
      </li>
    )),
    <li key="logout">
      <LogoutBtn
        btnType="link"
        onLogoutHook={window.hideMenu}
      />
    </li>,
  ];
};

Menu.propTypes = {
  curUser: propType(userFragment),
};

Menu.defaultProps = {
  curUser: null,
};

export default compose(injectIntl, withRouteProps, withGlobalContextProps)(Menu);
