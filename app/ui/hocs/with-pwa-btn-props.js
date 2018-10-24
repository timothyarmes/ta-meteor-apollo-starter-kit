import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import makeComponentTrashable from 'trashable-react';

// Provides handers for enabling/disabling push notifications

const withPWABtnProps = WrappedComponent => (
  class extends React.PureComponent {
    state = {
      supported: 'loading', // whether or not push notifications are supported
      subscribed: 'loading', // whether or not the user is subscribe to push notifications
    }

    componentDidMount() {
      // Check that service workers are supported, if so, progressively enhance
      // and add push messaging support, otherwise continue without it
      if ('serviceWorker' in navigator) {
        const { registerPromise } = this.props;
        registerPromise(navigator.serviceWorker.ready)
          .then(() => this.initialiseState())
          .catch(exc => console.log(exc));
      } else {
        this.setSupported(false);
        this.setSubscribed(false);
        console.log('Service workers aren\'t supported in this browser.');
      }
    }

    setSupported = (supported) => {
      this.setState(() => ({ supported }));
    }

    setSubscribed = (subscribed) => {
      this.setState(() => ({ subscribed }));
    }

    initialiseState = () => {
      // Are notifications supported in the service worker?
      if (!('showNotification' in ServiceWorkerRegistration.prototype)) {
        console.log('Notifications aren\'t supported.');
        this.setSupported(false);
        this.setSubscribed(false);
        return;
      }

      // Check the current notification permission. If its denied, it's a
      // permanent block until the user changes the permission
      if (Notification.permission === 'denied') {
        console.log('The user has blocked notifications.');
        this.setSupported(false);
        this.setSubscribed(false);
        return;
      }

      // Check if push messaging is supported
      if (!('PushManager' in window)) {
        console.log('Push messaging isn\'t supported.');
        this.setSupported(false);
        this.setSubscribed(false);
        return;
      }

      const { registerPromise } = this.props;

      registerPromise(navigator.serviceWorker.ready)
        .then(registration => registerPromise(registration.pushManager.getSubscription()))
        .then((subscription) => {
          this.setSupported(true);
          this.setSubscribed(!!subscription);
        })
        .catch(exc => console.log('Error during getSubscription()', exc));
    }

    handleSubscriptionChange = ({ subscribed }) => {
      this.setSubscribed(subscribed);
    }

    render() {
      const { supported, subscribed } = this.state;

      return (
        <WrappedComponent
          supported={supported}
          subscribed={subscribed}
          handleSubscriptionChange={this.handleSubscriptionChange}
          {...this.props}
        />
      );
    }
  }
);

export default compose(makeComponentTrashable, withPWABtnProps);

export const pwaBtnPropTypes = {
  supported: PropTypes.oneOf([true, false, 'loading']).isRequired,
  subscribed: PropTypes.oneOf([true, false, 'loading']).isRequired,
  handleSubscriptionChange: PropTypes.func.isRequired,
};
