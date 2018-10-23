import React from 'react';
import { Link } from 'react-router-dom';
import { propType } from 'graphql-anywhere';
import { compose, setDisplayName } from 'recompose';
import { injectIntl } from 'react-intl';
import userFragment from '/app/ui/apollo-client/user/userFragment';
import { withRouteProps, withGlobalContextProps } from '/app/ui/hocs';
import { LogoutBtn } from './auth';

const Menu = ({ curUser, homeUrl, dataTestUrl, adminUrl }) => {
  const menuRoutes = [
    { path: homeUrl(), label: 'Home', menu: true, auth: true },
    { path: dataTestUrl(), label: 'Data test', menu: true },
  ];

  if (curUser && curUser.roles.includes('admin')) {
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
    curUser
      ? (
        <li key="logout">
          <LogoutBtn
            btnType="link"
            onLogoutHook={window.hideMenu}
          />
        </li>
      )
      : null,
  ];
};

Menu.propTypes = {
  curUser: propType(userFragment),
};

Menu.defaultProps = {
  curUser: null,
};

export default compose(
  injectIntl,
  withRouteProps,
  withGlobalContextProps,
  setDisplayName('Menu'),
)(Menu);
