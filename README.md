# Meteor 1.8, Apollo 2, React 16, PWA, SSR, Authentication & Styled-Components boilerplate

A simple kit to start experimenting with Apollo, Meteor, React, PWA, SSR, Authentication and Styled Components.

### This project includes the following libraries/functionality:
- Apollo 2 GraphQL server running with Express bound to the Meteor (1.8) app
- React 16
- App-Shell based architecture with dynamic loading of required components
- SSR with support for an app-shell specific route
- Authentication: password & facebook (via meteor accounts)
- Styled components
- Recompose
- Jest & Enzyme for testing
- Storybook
- sanitize.css
- basscss
- basic admin functionality via alanning:roles
- Code splitting on startup and router level
- Progressive Web App features:
  * service-worker;
  * caching;
  * add to home screen;
  * push notifications;
  * app shell architecture;

This starter kit is based on the [excellent work](https://github.com/fede-rodes/meteor-apollo-starter-kit) done by Federico Rodes, however it had been heavily modified <sup id="modified">[1](#modifiedf)</sup>.

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

#### 4. Register the app on Facebook:
Follow [this](https://medium.com/@jaaaco/add-facebook-login-to-meteor-app-in-2-minutes-3c744b46009e) tutorial to register the app on Facebook; this will allow you to use Facebook authentication service. Once you get your appId and secret key, copy said values back into your settings.json file.

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

### Things you should know

#### The App-Shell architecture

This demo app provides an application-shell containing a header and a menu, along with the minimal styles necessary to display this shell. The initial client-side javascript downloaded to the client is also as small as possible, with the code for the routes to be displayed being brought in afterwards using dynamic imports (see /app/client/startup.js). This allows the application shell to be displayed
very quickly for a great user experience.

The app uses a services worker to provide its Progressive Web App features. The service worker uses Google's [Workbox][Workbox] to handle the caching of the application shell and its
required files. The worker downloads and caches a special route called `/app-shell` which contains only the shell (without any other server-side rendered content). When the app is refreshed the service worker will always request this route from the server to retrieve (and quickly display) the app shell container, at which point the client will update the interface and data using dynamic imports and [react-loadable][react-loadable].

The latest `/app-shell` is always fetched from the server and cached when the app is on-line.
When off-line, the service work will use its cached local copy.

Finally, the service worker makes good use of the fact that Meteor supplies hashes for all the files that it injects into the HTML payload. Requests for hashed files are returned from the local storage
if they're cached, and if not they're fetched and stored for future use. This can substantially improve
the load time after the first visit.

#### Updating the service worker

To modify the service worker's `sw.js` file you'll first need to install `workbox-cli`:

```
npm install -g workbox-cli
```

Then, make your changes to `swSrc.js`, and then run:

```
npm run update-sw
```

This will inject the dependencies from the `/public` folder into the `swSrc.js` and save the result into `sw.js`.

#### react-loadable and SSR

`react-loadable` is used to provide for dynamic loading of react components. This works out-of-the-box for client side rendering, but it requires special care when rendering on the server. The meteor package [nemms:meteor-react-loadable][nemms:meteor-react-loadable] provides the necessary support for this purpose. Of particular importance is the fact that any dynamically loadable components need to be defined as constants in the build, so that they can be 'captured' and preloaded by the server. In this starter-kit the reloadable components are defined in `app/ui/loadables.js`.

Note that `nemms:meteor-react-loadable` can't be used to handle nested loadable components.

#### Running storybook
Open a new terminal (the meteor app doesn't need to be running) and type:
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

### More resources

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

<b id="modifiedf">1</b> Updates include: Meteor 1.8, Apollo 2, SSR, complete overhaul of the service worker for better caching, restructuring components to use `recompose`, removal of `redux` (since we have `apollo-link-state` now), and many other little things. [↩](#modified)