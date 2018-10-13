import { withStateHandlers } from 'recompose';

// Adds a `disabled` prop with getters/setters.
// Typically used for buttons

const withDisabledProps = withStateHandlers(
  ({ disabled = false }) => ({ disabled }),
  {
    disableBtn: () => () => ({ disabled: true }),
    enableBtn: () => () => ({ disabled: false }),
  },
);

export default withDisabledProps;
