import { withStateHandlers } from 'recompose';

const withMessageProps = withStateHandlers(
  ({ errorMsg = '', successMsg = '' }) => ({ errorMsg, successMsg }),
  {
    setErrorMessage: () => errorMsg => ({ errorMsg }),
    setSuccessMessage: () => successMsg => ({ successMsg }),
    clearMessages: () => () => ({ errorMsg: '', successMsg: '' }),
  },
);

export default withMessageProps;
