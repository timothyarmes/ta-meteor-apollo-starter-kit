import React from 'react';
import { compose, withProps } from 'recompose';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';
import Loading from '/app/ui/components/dumb/loading';
import nonOptimalStates from './non-optimal-states';

// Provides props for the current locale and messages, based on the `locale`  and `section` properties
// passed through to the component. The messages are provided by a GraphQL query.

const GET_LOCAL_MESSAGES = gql`
  query intl($locale: String!, $section: String!) {
    locale(locale: $locale, section: $section) {
      messages
      locale
    }
  }
`;

const withLocaleProps = compose(
  graphql(GET_LOCAL_MESSAGES, { options: ({ locale, section }) => ({ variables: { locale, section } }) }),
  withProps(({ data: { loading, error, locale } }) => ({ loading, error, locale })),
  nonOptimalStates([
    { when: ({ error }) => error, render: ({ error }) => <div>{error.message}</div> },
    { when: ({ loading }) => loading, render: Loading },
  ]),
);

export default withLocaleProps;
