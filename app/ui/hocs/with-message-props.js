import { withStateHandlers } from 'recompose';

// Provides error/success message properties with getters/setters

const withMessageProps = withStateHandlers(
  ({ errorMsg = '', successMsg = '' }) => ({ errorMsg, successMsg }),
  {
    setErrorMessage: () => errorMsg => ({ errorMsg }),
    setSuccessMessage: () => successMsg => ({ successMsg }),
    clearMessages: () => () => ({ errorMsg: '', successMsg: '' }),
  },
);

export default withMessageProps;
