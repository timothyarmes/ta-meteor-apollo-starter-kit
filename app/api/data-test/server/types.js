import gql from 'graphql-tag';

const types = gql`
  type DataTest {
    string: String
  }
  
  type Query {
    dataTest: DataTest!
  }
`;

export default types;
