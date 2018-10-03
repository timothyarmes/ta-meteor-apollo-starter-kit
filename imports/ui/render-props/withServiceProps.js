import { withStateHandlers } from 'recompose';

const withServiceProps = withStateHandlers(
  ({ service = '' }) => ({ service }),
  {
    setService: () => service => ({ service }),
    clearService: () => () => ({ service: '' }),
  },
);

export default withServiceProps;
