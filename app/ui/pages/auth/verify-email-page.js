import { Accounts } from 'meteor/accounts-base';
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { withRouter } from 'react-router-dom';
import AuxFunctions from '/app/api/aux-functions';
import { injectIntl } from 'react-intl';
import { withRouteProps, withSEO } from '/app/ui/hocs';
import Loading from '/app/ui/components/dumb/loading';

class VerifyEmailPage extends React.Component {
  componentWillMount() {
    const {
      intl: { formatMessage: t },
      match,
      history,
      verifyEmailExpiredUrl,
      homeUrl,
    } = this.props;

    // Get token from url params
    const token = (match && match.params && match.params.token) || '';

    Accounts.verifyEmail(token, (err) => {
      if (err) {
        console.log(`[router] ${err.reason}`);
        history.push(verifyEmailExpiredUrl());
      } else {
        AuxFunctions.delayedAlert(t({ id: 'verifyEmailSuccessMessage' }), 700);
        history.push(homeUrl);
      }
    });
  }

  render() {
    return <Loading key="view" />;
  }
}

VerifyEmailPage.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      token: PropTypes.string,
    }).isRequired,
  }).isRequired,
  history: PropTypes.shape({
    push: PropTypes.func.isRequired,
  }).isRequired,
};

export default compose(
  injectIntl,
  withRouteProps,
  withRouter,
  withSEO({ title: 'verifyEmailHTMLDescription' }),
)(VerifyEmailPage);
