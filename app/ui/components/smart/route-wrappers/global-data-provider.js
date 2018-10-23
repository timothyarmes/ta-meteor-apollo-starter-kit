import { Meteor } from 'meteor/meteor';
import React from 'react';
import PropTypes from 'prop-types';
import { compose } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { propType } from 'graphql-anywhere';
import { onTokenChange } from '/app/ui/apollo-client/auth';
import userFragment from '/app/ui/apollo-client/user/userFragment';
import Loading from '/app/ui/components/dumb/loading';

export const GET_USER = gql`
  query user {
    user {
      ...userFragment
    }
  }
  
  ${userFragment}
`;

/**
 * @summary Injects global data (current user, global settings, whatever) into
 * child components.
 */

export const GlobalDataContext = React.createContext({ user: null });

class GlobalDataProvider extends React.Component {
  componentDidMount() {
    if (Meteor.isClient) {
      const { userData } = this.props;

      // Not sure why we have to force a refresh the first time round. It appears to be a bug in
      // ApolloLink, which isn't executing the setContext on the first query.
      userData.refetch();

      onTokenChange(() => setTimeout(() => userData.refetch(), 0));
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

export default compose(
  graphql(GET_USER, { name: 'userData' }),
)(GlobalDataProvider);
