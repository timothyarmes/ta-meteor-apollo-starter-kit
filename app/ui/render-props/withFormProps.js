import { compose, withHandlers } from 'recompose';
import { withDisabledProps, withMessageProps } from '.';

const withFormProps = withHandlers({
  handleBefore: props => (cb) => {
    const { disableBtn, clearMessages } = props;
    disableBtn();
    clearMessages();

    // Allow other components to extend handleBefore default functionality
    if (cb) { cb(); }
  },

  handleClientError: props => (err) => { // eslint-disable-line no-unused-vars
    const { setErrorMessage, enableBtn } = props;
    setErrorMessage(err.reason || err.message || 'Unexpected error');
    enableBtn();
  },

  handleServerError: props => (err) => {
    const { setErrorMessage, enableBtn } = props;
    setErrorMessage(err.reason || err.message || 'Unexpected error');
    enableBtn();
  },

  handleSuccess: props => (cb) => {
    const { enableBtn, clearMessages } = props;
    enableBtn();
    clearMessages();

    // Allow other components to extend handleSuccess default functionality
    if (cb) { cb(); }
  },
});

export default compose(withDisabledProps, withMessageProps, withFormProps);
