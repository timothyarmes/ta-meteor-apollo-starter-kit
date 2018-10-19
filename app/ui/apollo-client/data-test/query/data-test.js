import gql from 'graphql-tag';

const dataTestQuery = gql`
  query dataTest {
    dataTest {
      string
    }
  }
`;

export default dataTestQuery;
