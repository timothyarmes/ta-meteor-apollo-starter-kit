import React from 'react';
import PropTypes from 'prop-types';
import { compose, setDisplayName } from 'recompose';
import { FormattedMessage as T } from 'react-intl';
import { withApollo } from 'react-apollo';
import { logout } from '/app/ui/apollo-client/auth';
import Button from '/app/ui/components/dumb/button';

const LogoutBtn = ({ client: apolloClient, btnType, disabled, onLogoutHook }) => (
  <Button
    type={btnType}
    disabled={disabled}
    onClick={(evt) => {
      if (evt) { evt.preventDefault(); }
      logout(apolloClient).then(onLogoutHook);
    }}
  >
    <T id="authLogoutButton" />
  </Button>
);

LogoutBtn.propTypes = {
  client: PropTypes.shape({
    resetStore: PropTypes.func.isRequired,
  }).isRequired,
  btnType: PropTypes.oneOf(['button', 'link', 'submit']),
  disabled: PropTypes.bool,
  onLogoutHook: PropTypes.func,
};

LogoutBtn.defaultProps = {
  btnType: 'button',
  disabled: false,
  onLogoutHook: () => {},
};

export default compose(
  withApollo,
  setDisplayName('LogoutBtn'),
)(LogoutBtn);
