import collection from '../../collection';
import utils from '../../utils';

// Wrap collection and utils around namespace for clarity
const Users = { collection, utils };

//------------------------------------------------------------------------------
/**
* @summary Remove subscription from user's record.
*/
const deleteSubscription = (root, args, context) => {
  const { endpoint } = args;
  const { user} = context;

  Users.utils.checkLoggedInAndVerified(user);

  const selector = { _id: user._id };
  const modifier = { $pull: { subscriptions: { endpoint } } };
  Users.collection.update(selector, modifier);

  return { _id: user._id };
};
//------------------------------------------------------------------------------

export default deleteSubscription;
