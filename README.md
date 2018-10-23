# A starting point for creating a new Progressive Web Application based on Apollo 2, Meteor 1.8 and React 16, with support for server-side rendering, authentication and Styled Components.

### This project includes the following libraries/functionality:
- Apollo 2 GraphQL server running with Express bound to the Meteor (1.8) app
- React 16
- Multilingual support (using react-intl) with dynamic loading of required locale messages
- Authentication: password & facebook (server-side Meteor accounts, GraphQL client-side)
- SSR with support for an app-shell specific route
- App-Shell based architecture with dynamic loading of required components
- Styled components
- Recompose
- Jest & Enzyme for testing
- Storybook
- sanitize.css
- basscss
- Basic admin functionality
- Code splitting on startup and router level
- Progressive Web App features:
  * service-worker;
  * caching;
  * add to home screen;
  * push notifications;
  * app shell architecture;

This starter kit is based on the [excellent work](https://github.com/fede-rodes/meteor-apollo-starter-kit) done by Federico Rodes, however it had been very heavily modified <sup id="modified">[1](#modifiedf)</sup>.

### Step by step guide to get started with this boilerplate

#### 1. Clone the project and install NPM dependecies:
```
git clone https://github.com/timothyarmes/ta-meteor-apollo-starter-kit.git
cd ta-meteor-apollo-starter-kit/
meteor npm install
```

#### 2. Create your settings.json file:
Create a new file called ```settings.json``` based on the provided ```settings.sample.json```.

#### 3. Register the app on Mailgun:
Mailgun will allow you to use password authentication service and send emails from your app.

In order to get started, first access your [Mailgun][Mailgun] account. Then, grab your sandbox domain smtp username and password and copy said values into your settings.json file. Finally, add your email address to the list of [Authorized Recipients](https://help.mailgun.com/hc/en-us/articles/217531258-Authorized-Recipients).

#### 4. Register the app on Facebook. You only need to do this if you wish to have Facebook logon support. 

1. Visit https://developers.facebook.com
2. Add a new app from the `My Apps` menu
3. Choose the `Facebook Login product, and accept the defaults. You __don't__ need a direct URL.
4. Copy your appId to your `settings.json` file.

#### 5. Setup Push Notifications Service
1. create a new file called ```manifest-pwa.json``` based on the provided ```manifest-pwa.sample.json``` (see ```/public``` folder).
2. get your Google Cloud Message (GCM) server key and sender id from Firebase as follows:
  * first, got to your Firebase account: https://console.firebase.google.com/;
  * click on 'Add project';
  * click on 'settings' ('gear' icon, top left);
  * move to the 'CLOUD MESSAGING' tab at the top;
  * you should be able to see both server key and sender id;
3. copy your sender id to your manifest-pwa.json and your server key to your settings.json ("firebase": { "privateKey": ...);
4. open a terminal and install 'web-push' globally: ```npm i -g web-push```;
5. generate VAPID keys: ```web-push generate-vapid-keys --json```;
6. copy-paste your VAPID keys into your settings.json file;

#### 6. Run the app
You should now be able to run the app locally:
```
meteor --settings settings.json
```

### Understanding the Boiler Plate's Architecture

The root of project contains two important directories: _app_ contains the application source and _tests_ contains mocks that are used by [Jest][Jest] when running tests.

The _app_ directory is cleanly separated into:

* _api_ - Contains the GraphQL types and resolvers as well as other related utilities
* _entry-points_ - Contains the client and server entry points
* _intl_ - Contains the message strings for the supported locales
* _ui_ - Contains all the React components for the user interface

#### The PWA architecture

This demo app provides an application-shell containing a header and a menu, along with the minimal styles necessary to display this shell. The initial client-side javascript downloaded to the client is also as small as possible, with the code for the routes to be displayed being brought in afterwards using dynamic imports (see /app/entry-points/client/startup.js). This allows the application shell to be displayed
very quickly for a great user experience.

The app uses a services worker to provide its Progressive Web App features. The service worker uses Google's [Workbox][Workbox] to handle the caching of the application shell and its
required files. The worker downloads and caches a special route called `/app-shell` which contains only the shell (without any other server-side rendered content). When the app is refreshed the service worker will always request this route from the server to retrieve (and quickly display) the app shell container, at which point the client will update the interface and data using dynamic imports and [react-loadable][react-loadable].

The latest `/app-shell` is always fetched from the server and re-cached when the app is on-line.
When off-line, the service work will use its cached local copy.

Finally, the service worker makes good use of the fact that Meteor supplies hashes for all the files that it injects into the HTML payload. Requests for hashed files are returned from the local storage
if they're cached, and if not they're fetched and stored for future use. This can substantially improve
the load time after the first visit.

To modify the service worker's _sw.js_ file you'll first need to install `workbox-cli`:

```
npm install -g workbox-cli
```

Then, make your changes to _swSrc.js_, and then run:

```
npm run update-sw
```

This will inject the dependencies from the _/public_ folder into the _swSrc.js_ and save the result into _sw.js_.

#### react-loadable and SSR

`react-loadable` is used to provide support for dynamic loading of react components. This package requires special care when rendering on the server. The meteor package [nemms:meteor-react-loadable][nemms:meteor-react-loadable] provides the necessary support for this purpose. Of particular importance is the fact that any dynamically loadable components need to be defined as constants in the build, so that they can be 'captured' and preloaded by the server. In this starter-kit the reloadable components are defined in `app/ui/loadables.js`.

Note that `nemms:meteor-react-loadable` can't be used to handle nested loadable components.

#### Multilingual support

When creating a new project it's incredibly important to internationalise your application from the beginning. Adding multilingual support later on is a much more complicated task. 

Even if you're not internationalising your app, using translation files makes it easier to handle things such as plural strings, and you'll be ready for that day when the client decides that they _do_ want a localised version after all.

For these reasons the starter kit comes with out-of-the box support for multilingual support. The locale is specified on the URL using one of two schemes:

1. Non-prefixed URLs (e.g. _/my-page_) are displayed in the site's primary language, all other locales have prefixed URLs (e.g. _/fr/my-page_).

  This is the case when `primaryLocale` is defined in _/app/intl/index.js_. Using a primary locale means that the user __won't__ automatically see a localised version of the site when visiting the root. This is the best option if you don't initially intend on localising your site, since the URLs won't be prefixed.  

2. There's no primary locale, and all URLs are prefixed.

 This is the case if `primaryLocale` is `undefined`. In this case, if the user visits the root (or __any__ url that isn't prefixed with a known locale) then the user will be redirected to the best-matching locale based on the `accept-language` setting sent by their browser. This is the best choice for multilingual sites since the user will immediately see a localised version of the site.

Once the locale is read from the URL, the locale's messages are fetched and cached via a GraphQL query.

The translations strings are all stored in one file in the starter kit, however they're in a simple JS object, so you can split them up if you prefer. The important thing to note is that you __do not__ need to send all your messages to the client in one go. The translation file is separated into sections, allowing you to only fetch the translations that you need for a specific area of your site. By way of example, the starter kit has an `app` section for the main app, and an `admin` section for the administration area. The handy `Localised` component allows you to easily fetch the translations for a given section:


````
const LocalisedAdminPage = props => (
  <Localised section="admin"><WrappedInnerAdmin {...props} /></Localised>
);
````

`Localised` components can be nested, and children have access to all the messages defined by all the ancestors.

#### GraphQL endpoints for Meteor accounts

This starker kit uses Meteor's own user accounts support on the server, however a full set of GraphQL endpoints have been provided so that the client can eschew Meteor's accounts on the client. Meteor accounts are excellent, however there are several reasons to prefer GraphQL in this situation:

* This is a _Meteor/Apollo_ starter kit, so it seems reasonable to assume that developers would prefer not two have two difference storage solutions - Meteor collections for the user account and Apollo for everything else. Having Apollo manage everything is cleaner.

* Providing a full set of GraphQL endpoints for account creation and authentication will prove very useful when developing other non-Meteor clients (mobiles apps, for example) that also wish to connect to the server.

* By removing all remnants of client-side collections we can remove MiniMingo, thus making a significant space saving. Unfortunately this work is still be be done (push requests are welcomed!).

##### Oauth

Also worthy of note is that the kit doesn't rely on Meteor's OAuth support for the facebook login, preferring instead to use [react-facebook-login][react-facebook-login] to retrieve the access token that's then used to login into Facebook using Meteor accounts on the server (via GraphQL). The reason for this is due to the way Meteor works when using OAuth:

1. The client clicks the login button, which opens a Facebook login pop-up.
2. Facebook connects to the Meteor server at a special URL (_../_oauth/facebook?close) to verify the login
3. The Meteor server verifies the login and retrieves an access token, which is then set on the user account
4. The update to the user account is sent back to the client via ddp, and the User collection is updated on the client (via MiniMongo). The client then has the access token.

Since we don't wish to rely on Meteor collections this mechanism doesn't work for us. We need the access token to be returned directly from Facebook. `react-facebook-login` does exactly this.

### More resources

#### Storybooks
[Storybook][Storybook] is a javascript development environment which makes it easy to see and experiment with your React components with having to run the entire applications. It's ideally suited to simple components that don't require access to external data to operate. The kit provided stories for most of the the _dumb_ components.

To run Storybook, open a new terminal (the meteor app doesn't need to be running) and type:
```
npm i -g @storybook/cli
npm run storybook
```
Storybook will be available at [http://localhost:6006/](http://localhost:6006/).

#### Deploy to Heroku
In case you want to deploy the app to Heroku, follow these steps:
```
1. open a new terminal
2. type: 'heroku login' (enter your credentials)
3. heroku create <YOUR_APP_NAME>
4. heroku buildpacks:set https://github.com/AdmitHub/meteor-buildpack-horse.git
5. heroku addons:create mongolab
OR
5. heroku config:set MONGO_URL=mongodb://<dbuser>:<dbpassword>@<something>.mlab.com:<port>/<dbname>
6. heroku config:set ROOT_URL=https://<YOUR_APP_NAME>.herokuapp.com
7. heroku config:add METEOR_SETTINGS="$(cat settings.json)"
8. git push heroku master
OR (if you are working on a different branch than master)
8. git push heroku <BRANCH-NAME>:master
9. heroku open
```

#### Favicon / manifest generator
In order to generate the favicons for your project, you can use the following generator:
https://realfavicongenerator.net/

#### Bundle-visualizer
```
cd meteor-apollo-starter-kit/
meteor --extra-packages bundle-visualizer --production --settings settings.json
```

Then go to: [http://localhost:3000/](http://localhost:3000/)

Finding dependencies:
```
npm ls <lib-name>
```

Before deploying to production, if you used --extra-packages, simply remove bundle-visualizer from the list of included packages and run meteor as normal.

Learn more at:
- https://blog.meteor.com/announcing-meteor-1-5-b82be66571bb
- https://blog.meteor.com/putting-your-app-on-a-diet-with-meteor-1-5s-bundle-visualizer-6845b685a119

#### Look for meteor package dependencies
The following command is handy when trying to reduce your client bundle size and need to identify where the dependencies are coming from.
```
meteor list --tree

OR

for p in `meteor list | grep '^[a-z]' | awk '{sub(/[+*]$/, "", $2);
print $1"@"$2 }'`;
do echo "$p";
meteor show "$p" | grep -E '^  [a-z]';
echo;
done
```
Learn more:
- https://github.com/meteor/meteor/issues/2853#issuecomment-283320603


#### Lighthouse
```
npm install -g lighthouse
# or use yarn:
# yarn global add lighthouse
```
Then, open a new terminal and run meteor in production mode so that assets get bundle and the app's performance gets to a real deployment ```meteor run --production --settings settings.json```

After that, open a new terminal and run: ```lighthouse http://localhost:3000```

In case you run lighthouse inside the /meteor-apollo-starter-kit app's folder, you'll need to delete the report generated by the audit to avoid a static-html error. See [issue #60](https://github.com/fede-rodes/meteor-apollo-starter-kit/issues/60) for more info.


### Further reading: articles, docs and (video) tutorials

#### Meteor Apollo
- [Meteor `apollo` package docs](http://dev.apollodata.com/core/meteor.html)
- [Apollo docs](http://dev.apollodata.com/)
- https://blog.meteor.com/create-a-simple-hello-world-app-with-meteor-and-apollo-64bab66a456f

#### Progressive Web Apps / Service Workers
- https://medium.com/@addyosmani/progressive-web-apps-with-react-js-part-i-introduction-50679aef2b12
- https://dzone.com/articles/introduction-to-progressive-web-apps-offline-first
- https://dzone.com/articles/introduction-to-progressive-web-apps-instant-loadi
- https://dzone.com/articles/introduction-to-progressive-web-apps-push-notifica
- https://medium.com/@addyosmani/a-tinder-progressive-web-app-performance-case-study-78919d98ece0
- https://www.made-on-mars.com/blog/how-to-pwa-an-introduction-on-progressive-web-app-and-a-tutorial-to-create-one-with-full-features-push-notification-service-worker-offline-mode/
- https://jakearchibald.com/2014/offline-cookbook/
- https://youtu.be/cmGr0RszHc8
- https://classroom.udacity.com/courses/ud899
- https://developers.google.com/web/fundamentals/codelabs/push-notifications/
- https://dzone.com/articles/web-push-notifications-1
- https://medium.com/@firt/pwas-are-coming-to-ios-11-3-cupertino-we-have-a-problem-2ff49fd7d6ea
- https://serviceworke.rs
- https://ada.is/progressive-web-apps-talk/
- https://web-push-book.gauntface.com
- https://developers.google.com/web/ilt/pwa/introduction-to-push-notifications
- https://developers.google.com/web/fundamentals/app-install-banners/?hl=en#deferring_or_cancelling_the_prompt
- https://developers.google.com/web/tools/workbox/

#### PWA off-line support
- https://medium.com/@addyosmani/progressive-web-apps-with-react-js-part-3-offline-support-and-network-resilience-c84db889162c
- https://codelabs.developers.google.com/codelabs/your-first-pwapp/#1
- https://googlechrome.github.io/samples/service-worker/custom-offline-page/index.html

#### Service Workers Scripts
- https://github.com/mozilla/serviceworker-cookbook
- https://github.com/GoogleChrome/samples/tree/gh-pages/service-worker
- https://github.com/jakearchibald/isserviceworkerready/tree/gh-pages/demos
- https://github.com/NitroBAY/meteor-service-worker
- https://github.com/saurshaz/pwa-meteor/blob/master/client/serviceWorker.js

#### Dynamic imports
- https://youtu.be/j-WcyAjVceM

#### styled components
- https://youtu.be/qu4U7lwZTRI

[Mailgun]: https://www.mailgun.com/
[react-loadable]: https://github.com/jamiebuilds/react-loadable
[nemms:meteor-react-loadable]: https://github.com/nemms/meteor-react-loadable
[Workbox]: https://developers.google.com/web/tools/workbox/
[react-facebook-login]: https://github.com/keppelen/react-facebook-login
[Jest]: https://jestjs.io
[Storybook]: https://storybook.js.org

<b id="modifiedf">1</b> Updates include: Meteor 1.8, Apollo 2, SSR, Multilingual support, complete overhaul of the service worker for better caching, restructuring components to use `recompose`, removal of `redux` (since we have `apollo-link-state` now), GraphQL endpoints for authentication, and many other little things. [↩](#modified)