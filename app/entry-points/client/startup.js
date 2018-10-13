import { onPageLoad } from 'meteor/server-render';
import MeteorLoadable from 'meteor/nemms:meteor-react-loadable';
import { Switch, Route, Router, Redirect } from 'react-router-dom';
import { ApolloClient } from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { MeteorAccountsLink } from 'meteor/apollo';
import createBrowserHistory from 'history/createBrowserHistory';
import 'unfetch/polyfill';

// Initialise react-intl
import { primaryLocale, otherLocales } from '/app/intl';

// Need to preload of list of loadable components for MeteorLoadable
import '/app/ui/loadables';

// To get started, create an ApolloClient instance and point it at your GraphQL
// server (handled in our case by meteor-apollo). By default, this client will
// send queries to the '/graphql' endpoint on the same host.

const onErrorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.map(({ message, locations, path }) => console.log(
      `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`,
    ));
  }
  if (networkError) console.log(`[Network error]: ${networkError}`);
});

const client = new ApolloClient({
  link: ApolloLink.from([
    onErrorLink,
    new MeteorAccountsLink(),
    new HttpLink({
      uri: '/graphql',
    }),
  ]),
  cache: new InMemoryCache().restore(window.__APOLLO_STATE__),
});

// Inject the data into the app shell.
// If the structure's changed, ssr.js also needs updating.
async function renderAsync() {
  const [
    React,
    { hydrate, render },
    { default: App },
    { default: BurgerBtnController },
    { default: HeaderTitle },
    { default: LanguagePicker },
    { default: Routes },
    { default: Menu },
  ] = await Promise.all([
    import('react'),
    import('react-dom'),
    import('/app/ui/components/smart/app'),
    import('/app/ui/components/smart/header/burger-btn-controller'),
    import('/app/ui/components/smart/header/header-title'),
    import('/app/ui/components/dumb/language-picker'),
    import('/app/ui/routes'),
    import('/app/ui/components/smart/menu'),
    MeteorLoadable.preloadComponents(),
  ]);

  // Given that we are implementing App Shell Architecture and, therefore,
  // injecting (via reactDOM.render) the Header, Menu and Main components into
  // different HTML elements, we need a way to share the router 'history' among
  // all three mentioned components.
  // As a default, for every invocation of 'BrowserRouter', there will be new
  // 'history' instance created. Then, changes in the 'history' object in one
  // component won't be available in the other components. To prevent this, we are
  // relying on the 'Router' component instead of 'BrowserRouter' and defining our
  // custom 'history' object by means of 'createBrowserHistory' function. Said
  // 'history' object is then passed to every invocation of 'Router' and therefore
  // the same 'history' object will be shared among all three mentioned components.

  const history = createBrowserHistory();

  // Inject react app components into App's Shell
  const ClientApp = ({ component }) => (
    <Router history={history}>
      <ApolloProvider client={client}>
        <Switch>
          {/* Map our locales to separate routes */}
          { otherLocales.map(locale => (
            <Route
              key={locale}
              path={`/${locale}/`}
              render={props => <App component={component} {...props} locale={locale} section="app" />}
            />
          ))}

          { primaryLocale && (
            <Route
              key={primaryLocale}
              path="/"
              render={props => <App component={component} {...props} locale={primaryLocale} section="app" />}
            />
          )}

          {/* If no valid locale is given, we redirect to same route with the preferred locale prefixed */}
          <Route render={({ location }) => <Redirect to={`${window.__PREFERRED_LOCALE__}${location.pathname}`} />} />
        </Switch>
      </ApolloProvider>
    </Router>
  );

  render(<ClientApp component={BurgerBtnController} />, document.getElementById('burger-btn-controller'));
  render(<ClientApp component={Menu} />, document.getElementById('menu'));

  hydrate(<ClientApp component={HeaderTitle} />, document.getElementById('header-title'));
  hydrate(<ClientApp component={LanguagePicker} />, document.getElementById('header-lang-picker'));

  hydrate(<ClientApp component={Routes} />, document.getElementById('main'));
}

onPageLoad(() => {
  const renderStart = Date.now();
  const startupTime = renderStart - window.performance.timing.responseStart;
  console.log(`Meteor.startup took: ${startupTime}ms`);

  // Register service worker
  import('/app/ui/register-sw').then(() => {});

  renderAsync().then(() => {
    const renderTime = Date.now() - renderStart;
    console.log(`renderAsync took: ${renderTime}ms`);
    console.log(`Total time: ${startupTime + renderTime}ms`);
  });
});
