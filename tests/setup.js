import Enzyme from 'enzyme';
import { Meteor } from 'meteor/meteor';
import Adapter from 'enzyme-adapter-react-16';

Enzyme.configure({ adapter: new Adapter() });

global.Meteor = Meteor;
global.Meteor.settings = {
  smtp: {
    protocol: 'smtp',
    username: 'MAILGUN_USERNAME.mailgun.org',
    password: 'MAILGUN_PASSWORD',
    server: 'smtp.mailgun.org',
    port: '587',
  },
  facebook: {
    secret: 'FACEBOOK_SECRET',
  },
  firebase: {
    privateKey: 'FIREBASE_SERVER_KEY',
  },
  vapid: {
    subject: 'mailto:YOUR_EMAIL_ADDRESS',
    privateKey: 'WEB_PUSH_SERVER_KEY',
  },
  public: {
    facebook: {
      appId: 'FACEBOOK_APP_ID',
    },
    vapid: {
      publicKey: 'WEB_PUSH_PUBLIC_KEY',
    },
  },
  admins: [
    { email: 'admin@admin.com', password: 'password', roles: ['admin'] },
  ],
};
