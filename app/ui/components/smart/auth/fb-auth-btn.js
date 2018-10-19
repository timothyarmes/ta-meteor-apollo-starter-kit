import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { withApollo } from 'react-apollo';
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props';
import { loginWithFacebook } from '/app/ui/apollo-client/auth';
import Button from '/app/ui/components/dumb/button';

class FBAuthBtn extends React.PureComponent {
  callbackFacebook = async ({ accessToken }) => {
    const {
      onServerErrorHook,
      onSuccessHook,
    } = this.props;

    if (accessToken) {
      try {
        const { client: apolloClient } = this.props;
        await loginWithFacebook({ accessToken }, apolloClient);
        onSuccessHook();
      } catch (err) {
        onServerErrorHook(err);
      }
    }
  }

  render() {
    const { appId } = Meteor.settings.public.facebook;
    const { btnLabel, disabled, onBeforeHook } = this.props;

    return (
      <FacebookLogin
        version="3.1"
        appId={appId}
        fields="name,email,picture"
        disabled={disabled}
        onClick={onBeforeHook}
        callback={this.callbackFacebook}
        render={({ onClick, isDisabled, isProcessing, isSdkLoaded }) => (
          <Button
            variant="primary"
            disabled={isDisabled || isProcessing || !isSdkLoaded}
            size="large"
            expanded
            className="my2"
            onClick={onClick}
          >
            {btnLabel}
          </Button>
        )}
      />
    );
  }
}

FBAuthBtn.propTypes = {
  btnLabel: PropTypes.string.isRequired,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onServerErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
};

FBAuthBtn.defaultProps = {
  disabled: false,
  onBeforeHook: () => {},
  onServerErrorHook: () => {},
  onSuccessHook: () => {},
};

export default withApollo(FBAuthBtn);
