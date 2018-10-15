import React from 'react';
import { compose } from 'recompose';
import { FormattedMessage as T, injectIntl } from 'react-intl';
import { Query } from 'react-apollo';
import dataTest from '/app/ui/apollo-client/data-test/query/data-test';
import { withSEO } from '/app/ui/hocs';
import Loading from '/app/ui/components/dumb/loading';

const DataTest = () => (
  <Query query={dataTest}>
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
)(DataTest);
