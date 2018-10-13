import gql from 'graphql-tag';

const types = gql`
  type Locale {
    locale: String!
    messages: JSON!
  }

  type Query {
    locale(locale: String!, section: String!): Locale!
  }
`;

export default types;
