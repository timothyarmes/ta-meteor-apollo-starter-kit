import { withStateHandlers } from 'recompose';

// Provides login-service type prop with getters/setters


const withServiceProps = withStateHandlers(
  ({ service = '' }) => ({ service }),
  {
    setService: () => service => ({ service }),
    clearService: () => () => ({ service: '' }),
  },
);

export default withServiceProps;
