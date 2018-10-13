import React from 'react';
import { compose, withProps } from 'recompose';
import { graphql } from 'react-apollo';
import Loading from '/app/ui/components/dumb/loading';
import localeQuery from '/app/ui/apollo-client/locale/query/locale';
import nonOptimalStates from './non-optimal-states';

// Provides props for the current locale and messages, based on the `locale`  and `section` properties
// passed through to the component. The messages are provided by a GraphQL query.

const withLocaleProps = compose(
  graphql(localeQuery, { options: ({ locale, section }) => ({ variables: { locale, section } }) }),
  withProps(({ data: { loading, error, locale } }) => ({ loading, error, locale })),
  nonOptimalStates([
    { when: ({ error }) => error, render: ({ error }) => <div>{error.message}</div> },
    { when: ({ loading }) => loading, render: Loading },
  ]),
);

export default withLocaleProps;
