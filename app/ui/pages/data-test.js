import React from 'react';
import { compose, setDisplayName } from 'recompose';
import { FormattedMessage as T, injectIntl } from 'react-intl';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { withSEO } from '/app/ui/hocs';
import Loading from '/app/ui/components/dumb/loading';

const GET_DATA = gql`
  query dataTest {
    dataTest {
      string
    }
  }
`;

const DataTest = () => (
  <Query query={GET_DATA}>
    {({ data, loading }) => (
      loading
        ? <Loading />
        : <T id={data.dataTest.string} />
    )}
  </Query>
);

export default compose(
  injectIntl,
  withSEO({ title: 'dataTestHTMLTitle' }),
  setDisplayName('DataTest'),
)(DataTest);
