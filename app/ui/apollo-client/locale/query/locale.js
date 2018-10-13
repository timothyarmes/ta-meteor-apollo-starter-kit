import gql from 'graphql-tag';

const localeQuery = gql`
  query intl($locale: String!, $section: String!) {
    locale(locale: $locale, section: $section) {
      messages
      locale
    }
  }
`;

export default localeQuery;
