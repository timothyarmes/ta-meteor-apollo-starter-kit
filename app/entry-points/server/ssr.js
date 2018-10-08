import React from 'react';
import MeteorLoadable from 'meteor/nemms:meteor-react-loadable';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { Meteor } from 'meteor/meteor';
import { onPageLoad } from 'meteor/server-render';
import { ApolloClient } from 'apollo-client';
import { getDataFromTree } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { StaticRouter } from 'react-router-dom';
import fetch from 'node-fetch';

import App from '/app/ui/components/smart/app';
import HeaderTitle from '/app/ui/components/smart/header/header-title';
import Routes from '/app/ui/routes';

const render = async (sink) => {
  const ssrClient = new ApolloClient({
    link: new HttpLink({
      uri: Meteor.absoluteUrl('/graphql'),
      fetch,
    }),
    cache: new InMemoryCache(),
    ssrMode: true,
  });

  // /app-shell is a special route that does no server-side rendering
  // It's used by the service worker for all navigation routes, so after the first visit
  // the initial server response is very quick to display the app shell, and the client
  // adds in the data.

  // In the case of a first visit or a robot, we render everything on the server.

  if (sink.request.url.path === '/app-shell') {
    sink.appendToBody(`<script>window.__APOLLO_STATE__=${JSON.stringify(ssrClient.extract())};</script>`);
    sink.appendToBody(MeteorLoadable.getLoadedModulesScriptTag());
    return;
  }

  const ServerApp = ({ component }) => (
    <MeteorLoadable.Capture>
      <StaticRouter location={sink.request.url} context={{}}>
        <App component={component} apolloClient={ssrClient} />
      </StaticRouter>
    </MeteorLoadable.Capture>
  );

  // Load all data from local server
  await getDataFromTree(<ServerApp component={Routes} />);

  // Elements that we want rendered on the server
  const sheet = new ServerStyleSheet();
  sink.renderIntoElementById('header-title', renderToString(sheet.collectStyles(<ServerApp component={HeaderTitle} />)));
  sink.renderIntoElementById('main', renderToString(sheet.collectStyles(<ServerApp component={Routes} />)));

  // Append styles
  const styleTags = sheet.getStyleTags();
  sink.appendToHead(styleTags);

  // Append Apollo data
  sink.appendToBody(`<script>window.__APOLLO_STATE__=${JSON.stringify(ssrClient.extract())};</script>`);

  // Append preloaded ReactLoadabe modules
  sink.appendToBody(MeteorLoadable.getLoadedModulesScriptTag());
};

Meteor.startup(async () => {
  await MeteorLoadable.preloadComponents();
  onPageLoad(render);
});
