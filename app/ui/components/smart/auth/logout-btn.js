import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as T } from 'react-intl';
import { withApollo } from 'react-apollo';
import Button from '/app/ui/components/dumb/button';

const LogoutBtn = ({ client, btnType, disabled, onLogoutHook }) => (
  <Button
    type={btnType}
    disabled={disabled}
    onClick={(evt) => {
      if (evt) { evt.preventDefault(); }
      Meteor.logout(() => {
        // Clear apollo store.
        client.resetStore();
        // Pass event up to parent component.
        onLogoutHook();
      });
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

export default withApollo(LogoutBtn);
