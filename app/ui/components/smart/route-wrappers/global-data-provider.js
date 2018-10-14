import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'react-apollo';
import { propType } from 'graphql-anywhere';
import userFragment from '/app/ui/apollo-client/user/fragment/user';
import userQuery from '/app/ui/apollo-client/user/query/user';
import Loading from '/app/ui/components/dumb/loading';

/**
 * @summary Injects global data (current user, global settings, whatever) into
 * child components.
 */

export const GlobalDataContext = React.createContext({ user: null });

class GlobalDataProvider extends React.Component {
  componentWillMount() {
    // Refetch user data every time Meteor.loginTokens are set. This is required
    // when using FB loginStyle equals to 'redirect' at serviceConfiguration,

    const { userData } = this.props;
    const { user } = userData;

    if (Meteor.isClient) {
      if (Meteor.user() && !user) {
        userData.refetch();
      }

      Accounts.onLogin(() => {
        const { userData } = this.props; // eslint-disable-line no-shadow
        userData.refetch();
      });
    }
  }

  render() {
    const { userData, children } = this.props;
    const { error, loading, user } = userData;

    if (error) {
      console.log(error);
      return null;
    }

    if (loading) {
      return <Loading />;
    }

    return (
      <GlobalDataContext.Provider value={{ curUser: user }}>
        {children}
      </GlobalDataContext.Provider>
    );
  }
}

GlobalDataProvider.propTypes = {
  userData: PropTypes.shape({
    error: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    user: propType(userFragment),
    refetch: PropTypes.func.isRequired,
  }).isRequired,
};

// Apollo integration
const withData = graphql(userQuery, { name: 'userData' });

export default withData(GlobalDataProvider);
