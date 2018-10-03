import { withStateHandlers } from 'recompose';

const withDisabledProps = withStateHandlers(
  ({ disabled = false }) => ({ disabled }),
  {
    disableBtn: () => () => ({ disabled: true }),
    enableBtn: () => () => ({ disabled: false }),
  },
);

export default withDisabledProps;
