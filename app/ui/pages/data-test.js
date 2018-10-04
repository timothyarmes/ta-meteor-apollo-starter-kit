import React from 'react';
import { Query } from 'react-apollo';
import dataTest from '/app/ui/apollo-client/data-test/query/data-test';
import SEO from '/app/ui/components/smart/seo';
import Loading from '/app/ui/components/dumb/loading';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const DataTest = () => (
  <Query query={dataTest}>
    {({ data, loading }) => (
      loading
        ? <Loading />
        : <p>{data.dataTest.string}</p>
    )}
  </Query>
);

export default () => ([
  <SEO
    key="seo"
    schema="DataPage"
    title="Data Test Page"
    description="A starting point for Meteor applications."
    contentType="product"
  />,

  <DataTest key="dataTest" />,
]);
