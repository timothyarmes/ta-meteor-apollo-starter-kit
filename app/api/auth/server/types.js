import gql from 'graphql-tag';

const types = gql`

  input CreateUserProfileInput {
    name: String
  }

  # Type returned when the user logs in
  type LoginMethodResponse {
    id: String!
    token: String!
    tokenExpires: DateTime!
    user: User
  }

  type AuthSuccessResponse {
    success: Boolean
  }

  # A hashsed password
  input HashedPassword {
    # The hashed password
    digest: String!
    # Algorithm used to hash the password
    algorithm: String!
  }

  type Mutation {
    # Log the user in with a password.
    loginWithPassword (username: String, email: String, password: HashedPassword, plainPassword: String): LoginMethodResponse

    # Create a new user.
    createUser (username: String, email: String, password: HashedPassword, plainPassword: String, profile: CreateUserProfileInput): LoginMethodResponse

    # Change the current user's password. Must be logged in.
    changePassword (oldPassword: HashedPassword!, newPassword: HashedPassword!): AuthSuccessResponse

    # Request a forgot password email.
    forgotPassword (email: String!): AuthSuccessResponse

    # Reset the password for a user using a token received in email. Logs the user in afterwards.
    resetPassword (newPassword: HashedPassword!, token: String!): LoginMethodResponse

    # Log the user out.
    logout (token: String!): AuthSuccessResponse

    # Marks the user's email address as verified. Logs the user in afterwards.
    verifyEmail (token: String!): LoginMethodResponse

    # Send an email with a link the user can use verify their email address.
    sendVerificationEmail (email: String): AuthSuccessResponse

    # Login the user with a Facebook access token
    loginWithFacebook (accessToken: String!): LoginMethodResponse

    # Login the user with a Google access token
    loginWithGoogle (accessToken: String!, tokenId: String): LoginMethodResponse

    # Login the user with a linkedIn access token
    loginWithLinkedIn (code: String!, redirectUri: String!): LoginMethodResponse
  }
`;

export default types;
