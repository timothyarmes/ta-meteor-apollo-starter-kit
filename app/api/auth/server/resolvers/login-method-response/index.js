import { Meteor } from 'meteor/meteor';

const LoginMethodResponse = {
  user: ({ id }) => Meteor.users.findOne(id),
};

export default LoginMethodResponse;
