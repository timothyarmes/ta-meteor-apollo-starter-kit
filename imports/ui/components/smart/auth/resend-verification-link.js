import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import sendVerificationEmailMutation from '/imports/ui/apollo-client/user/mutation/send-verification-email';
import Button from '/imports/ui/components/dumb/button';

class ResendVerificationLink extends React.PureComponent {
  handleClick = async (evt) => {
    evt.preventDefault();

    const {
      sendVerificationEmail,
      onBeforeHook,
      onServerErrorHook,
      onSuccessHook,
    } = this.props;

    // Run before logic if provided and return on error
    try {
      onBeforeHook();
    } catch (exc) {
      return; // return silently
    }

    try {
      await sendVerificationEmail();
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
  sendVerificationEmail: PropTypes.func.isRequired,
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

// Apollo integration
const withMutation = graphql(sendVerificationEmailMutation, { name: 'sendVerificationEmail' });

export default withMutation(ResendVerificationLink);
