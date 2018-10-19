import React from 'react';
import PropTypes from 'prop-types';
import { compose, setDisplayName } from 'recompose';
import { withRouter } from 'react-router-dom';
import { withApollo } from 'react-apollo';
import AuxFunctions from '/app/api/aux-functions';
import { injectIntl } from 'react-intl';
import { withRouteProps, withSEO } from '/app/ui/hocs';
import Loading from '/app/ui/components/dumb/loading';
import { verifyEmail } from '/app/ui/apollo-client/auth';

class VerifyEmailPage extends React.Component {
  async componentDidMount() {
    const {
      intl: { formatMessage: t },
      match,
      history,
      verifyEmailExpiredUrl,
      homeUrl,
      client: apolloClient,
    } = this.props;

    // Get token from url params
    const token = (match && match.params && match.params.token) || '';

    try {
      await verifyEmail(token, apolloClient);
      history.push(homeUrl());
      AuxFunctions.delayedAlert(t({ id: 'verifyEmailSuccessMessage' }), 700);
    } catch (err) {
      console.log(err);
      history.push(verifyEmailExpiredUrl());
    }
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
  withApollo,
  withSEO({ title: 'verifyEmailHTMLDescription' }),
  setDisplayName('VerifyEmailPage'),
)(VerifyEmailPage);
