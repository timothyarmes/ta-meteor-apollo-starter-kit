import { ForbiddenError, AuthenticationError } from 'apollo-server-express';

// Users utilities
const utilities = {};

//------------------------------------------------------------------------------
utilities.checkLoggedInAndVerified = (user) => {
  // User should be logged in at this stage
  if (!user) {
    throw new AuthenticationError('User is not logged in!');
  }

  // Make sure email is verified (in case of password service)
  // TODO: use current loggedIn service instead
  const isPasswordService = Object.keys(user.services).indexOf('password') !== -1;
  const isEmailVerified = isPasswordService && user.emails[0].verified === true;
  if (isPasswordService && !isEmailVerified) {
    throw new ForbiddenError('Email is not verified!');
  }
};

//------------------------------------------------------------------------------
// TODO: pass email to verify as an argument
utilities.checkLoggedInAndNotVerified = (user) => {
  // User should be logged in at this stage
  if (!user) {
    throw new AuthenticationError('User is not logged in!');
  }

  if (user.emails[0].verified === true) {
    throw new ForbiddenError('Email already verified!');
  }
};
//------------------------------------------------------------------------------

export default utilities;
