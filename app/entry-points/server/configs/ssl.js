/* global Assets */

import { Meteor } from 'meteor/meteor';
import { createProxyServer } from 'http-proxy';

// Create an HTTPS proxy that redirects to the normal port.
// This is intended for local developement purposes when
// HTTPS is required (such as for Facebook logo)

if (process.env.WITH_HTTPS) {
  Meteor.startup(() => {
    const sslPort = 3100;
    const options = {
      ssl: {
        key: Assets.getText('ssl/server.key'),
        cert: Assets.getText('ssl/server.crt'),
      },
      target: 'http://localhost:3000',
      ws: true,
      xfwd: true,
    };

    createProxyServer(options).listen(sslPort);
    console.log('HTTPS proxy running');
  });
}
