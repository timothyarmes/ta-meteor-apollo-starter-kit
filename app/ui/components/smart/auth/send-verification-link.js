import React from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import sendVerificationEmail from '/app/ui/apollo-client/auth/send-verification-email';
import Button from '/app/ui/components/dumb/button';

class ResendVerificationLink extends React.PureComponent {
  handleClick = async (evt) => {
    evt.preventDefault();

    const {
      onBeforeHook,
      onServerErrorHook,
      onSuccessHook,
      client: apolloClient,
    } = this.props;

    // Run before logic if provided and return on error
    try {
      onBeforeHook();
    } catch (exc) {
      return; // return silently
    }

    try {
      await sendVerificationEmail({}, apolloClient);
      onSuccessHook();
    } catch (exc) {
      onServerErrorHook(exc);
    }
  }

  render() {
    const { label, disabled } = this.props;

    const text = <span>{label}</span>;

    const link = (
      // eslint-disable-next-line jsx-a11y/anchor-is-valid
      <Button type="link" onClick={this.handleClick}>
        {label}
      </Button>
    );

    return disabled ? text : link;
  }
}

ResendVerificationLink.propTypes = {
  label: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onServerErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

ResendVerificationLink.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onServerErrorHook: () => {},
  onSuccessHook: () => {},
};

export default withApollo(ResendVerificationLink);
