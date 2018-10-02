import gql from 'graphql-tag';

const sendVerificationEmail = gql`
  mutation {
    sendVerificationEmail {
      _id
    }
  }
`;

export default sendVerificationEmail;
