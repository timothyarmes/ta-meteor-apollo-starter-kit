/* global __meteor_runtime_config__ */
/* eslint no-undef: "error" */
import { BrowserPolicy } from 'meteor/browser-policy';

// Disallow all rules
BrowserPolicy.framing.disallow();
BrowserPolicy.content.disallowEval();
BrowserPolicy.content.disallowConnect();

// Google fonts
BrowserPolicy.content.allowEval('http://fonts.googleapis.com');
BrowserPolicy.content.allowFontDataUrl('http://fonts.googleapis.com');

// Facebook login
BrowserPolicy.content.allowScriptOrigin('https://connect.facebook.net');
BrowserPolicy.content.allowFrameOrigin('https://staticxx.facebook.com');
BrowserPolicy.content.allowFrameOrigin('https://www.facebook.com');
BrowserPolicy.content.allowConnectOrigin('https://graph.facebook.com');

// Allow Meteor DDP Connections
const rootUrl = __meteor_runtime_config__.ROOT_URL;
console.log(`ROOT_URL: ${rootUrl}`);

BrowserPolicy.content.allowConnectOrigin(rootUrl);
BrowserPolicy.content.allowConnectOrigin(rootUrl.replace(/http(s?)/, 'ws$1'));
