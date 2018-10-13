import collection from '../../collection';
import utils from '../../utils';

// Wrap collection and utils around namespace for clarity
const Users = { collection, utils };

/**
* @summary Save subscription into user's record.
*/

const saveSubscription = (root, args, context) => {
  const { subscription } = args;
  const { user } = context;

  Users.utils.checkLoggedInAndVerified(user);

  const selector = { _id: user._id };
  const modifier = { $addToSet: { subscriptions: subscription } };
  Users.collection.update(selector, modifier);

  return { _id: user._id };
};

export default saveSubscription;
