import React from 'react';
import PropTypes from 'prop-types';
import { disabledPropTypes, messagePropTypes } from './index';

//------------------------------------------------------------------------------
// PROPS PROVIDER:
//------------------------------------------------------------------------------
class HookProps extends React.PureComponent {
  handleBefore = (cb) => {
    const { disabledProps, messageProps } = this.props;
    disabledProps.disableBtn();
    messageProps.clearMessages();
    // Allow other components to extend handleBefore default functionality
    if (cb) { cb(); }
  }

  handleClientError = (err) => { // eslint-disable-line no-unused-vars
    const { disabledProps } = this.props;
    disabledProps.enableBtn();
  }

  handleServerError = (err) => {
    const { disabledProps, messageProps } = this.props;
    messageProps.setErrorMessage(err.reason || err.message || 'Unexpected error');
    disabledProps.enableBtn();
  }

  handleSuccess = (cb) => {
    const { disabledProps, messageProps } = this.props;
    disabledProps.enableBtn();
    messageProps.clearMessages();
    // Allow other components to extend handleSuccess default functionality
    if (cb) { cb(); }
  }

  render() {
    const api = {
      handleBefore: this.handleBefore,
      handleClientError: this.handleClientError,
      handleServerError: this.handleServerError,
      handleSuccess: this.handleSuccess,
    };

    const { children } = this.props;

    return children(api);
  }
}

HookProps.propTypes = {
  disabledProps: PropTypes.shape(disabledPropTypes).isRequired,
  messageProps: PropTypes.shape(messagePropTypes).isRequired,
};

export default HookProps;

//------------------------------------------------------------------------------
// PROPS:
//------------------------------------------------------------------------------
export const hookPropTypes = {
  handleBefore: PropTypes.func.isRequired,
  handleClientError: PropTypes.func.isRequired,
  handleServerError: PropTypes.func.isRequired,
  handleSuccess: PropTypes.func.isRequired,
};
