import saveSubscription from './save-subscription';
import deleteSubscription from './delete-subscription';
import sendPushNotification from './send-push-notification';
import sendVerificationEmail from './send-verification-email';

// Users namespace mutation resolvers
const Mutation = {
  saveSubscription,
  deleteSubscription,
  sendPushNotification,
  sendVerificationEmail,
};

export default Mutation;
