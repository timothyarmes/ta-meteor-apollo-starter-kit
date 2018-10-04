import gql from 'graphql-tag';

const dataTestQuery = gql`
  query {
    dataTest {
      string
    }
  }
`;

export default dataTestQuery;
