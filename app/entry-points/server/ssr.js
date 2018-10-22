import React from 'react';
import MeteorLoadable from 'meteor/nemms:meteor-react-loadable';
import acceptLanguage from 'accept-language';
import { renderToString } from 'react-dom/server';
import { ServerStyleSheet } from 'styled-components';
import { Meteor } from 'meteor/meteor';
import { onPageLoad } from 'meteor/server-render';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider, getDataFromTree } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';
import { StaticRouter, Route } from 'react-router-dom';
import Helmet from 'react-helmet';
import fetch from 'node-fetch';

import App from '/app/ui/components/smart/app';
import HeaderTitle from '/app/ui/components/smart/header/header-title';
import LanguagePicker from '/app/ui/components/dumb/language-picker';
import Routes from '/app/ui/routes';
import { primaryLocale, otherLocales } from '/app/intl';

const locales = primaryLocale ? [primaryLocale, ...otherLocales] : otherLocales;
acceptLanguage.languages(locales);

const render = async (sink) => {
  const ssrClient = new ApolloClient({
    link: new HttpLink({
      uri: Meteor.absoluteUrl('/graphql'),
      fetch,
    }),
    cache: new InMemoryCache(),
    ssrMode: true,
  });

  const preferredLocale = acceptLanguage.get(sink.request.headers['accept-language']);
  let locale = otherLocales.find(l => sink.request.url.path.startsWith(`/${l}`));
  let prefix = locale;

  // /app-shell is a special route that does no server-side rendering
  // It's used by the service worker for all navigation routes, so after the first visit
  // the initial server response is very quick to display the app shell, and the client
  // adds in the data.

  // In the case of a first visit or a robot, we render everything on the server.
  if (sink.request.url.path === '/app-shell') {
    sink.appendToBody(`<script>window.__APOLLO_STATE__=${JSON.stringify(ssrClient.extract())};</script>`);
    sink.appendToBody(`<script>window.__PREFERRED_LOCALE__='${preferredLocale}';</script>`);
    sink.appendToBody(MeteorLoadable.getLoadedModulesScriptTag());
    return;
  }

  // We first check if we need to redirect to a locale
  // We can only do this is there isn't a primary locale.
  if (!primaryLocale) {
    if (!locale) {
      sink.setStatusCode(307);
      sink.redirect(`/${preferredLocale || otherLocales[0]}${sink.request.url.path}`);
      return;
    }
  } else if (!locale) {
    // If there's no locale prefix, we use the primaryLocale instead
    locale = primaryLocale;
    prefix = '';
  }

  const ServerApp = ({ component, context }) => (
    <MeteorLoadable.Capture>
      <StaticRouter location={sink.request.url} context={context}>
        <ApolloProvider client={ssrClient}>
          <Route
            path={`/${prefix}`}
            render={props => <App component={component} {...props} locale={locale} section="app" />}
          />
        </ApolloProvider>
      </StaticRouter>
    </MeteorLoadable.Capture>
  );

  // Load all data from local server
  const context = {};
  await getDataFromTree(<ServerApp component={Routes} context={context} />);

  // Elements that we want rendered on the server
  const sheet = new ServerStyleSheet();
  sink.renderIntoElementById('header-title', renderToString(sheet.collectStyles(<ServerApp component={HeaderTitle} context={context} />)));
  sink.renderIntoElementById('header-lang-picker', renderToString(sheet.collectStyles(<ServerApp component={LanguagePicker} context={context} />)));
  sink.renderIntoElementById('main', renderToString(sheet.collectStyles(<ServerApp component={Routes} context={context} />)));

  // Append helmet and styles
  const helmetResult = Helmet.renderStatic();
  ['title', 'meta', 'link', 'script'].forEach(k => sink.appendToHead(helmetResult[k].toString()));
  sink.appendToHead(sheet.getStyleTags());

  // Append user's preferred locale
  sink.appendToBody(`<script>window.__PREFERRED_LOCALE__='${preferredLocale}';</script>`);

  // Append Apollo data
  sink.appendToBody(`<script>window.__APOLLO_STATE__=${JSON.stringify(ssrClient.extract())};</script>`);

  // Append preloaded ReactLoadabe modules
  sink.appendToBody(MeteorLoadable.getLoadedModulesScriptTag());
};

Meteor.startup(async () => {
  await MeteorLoadable.preloadComponents();
  onPageLoad(render);
});
