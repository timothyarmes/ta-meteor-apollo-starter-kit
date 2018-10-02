import { GraphQLError } from 'graphql';
import collection from './collection';

// Wrap collection around namespace for clarity
const Users = { collection };

// Users utilities
const utilities = {};

//------------------------------------------------------------------------------
utilities.checkLoggedInAndVerified = (user) => {
  // User should be logged in at this stage
  if (!user) {
    throw new GraphQLError('User is not logged in!');
  }

  // Make sure email is verified (in case of password service)
  // TODO: use current loggedIn service instead
  const isPasswordService = Object.keys(user.services).indexOf('password') !== -1;
  const isEmailVerified = isPasswordService && user.emails[0].verified === true;
  if (isPasswordService && !isEmailVerified) {
    throw new GraphQLError('Email is not verified!');
  }
};
//------------------------------------------------------------------------------
// TODO: pass email to verify as an argument
utilities.checkLoggedInAndNotVerified = (user) => {
  // User should be logged in at this stage
  if (!user) {
    throw new GraphQLError('User is not logged in!');
  }

  if (user.emails[0].verified === true) {
    throw new GraphQLError('Email already verified!');
  }
};
//------------------------------------------------------------------------------

export default utilities;
