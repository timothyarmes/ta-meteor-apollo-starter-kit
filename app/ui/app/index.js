import React from 'react';
import { Router } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { MeteorAccountsLink } from 'meteor/apollo';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';
import GlobalDataProvider from '../global-data-provider';
import 'unfetch/polyfill';

// To get started, create an ApolloClient instance and point it at your GraphQL
// server (handled in our case by meteor-apollo). By default, this client will
// send queries to the '/graphql' endpoint on the same host.

const client = new ApolloClient({
  link: ApolloLink.from([
    new MeteorAccountsLink(),
    new HttpLink({
      uri: '/graphql',
    }),
  ]),
  cache: new InMemoryCache(),
});

// Given that we are implementing App Shell Architecture and, therefore,
// injecting (via reactD,M.render) the Header, Menu and Main components into
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

const App = ({ component }) => (
  <ThemeProvider theme={theme}>
    <Router history={history}>
      <ApolloProvider client={client}>
        <GlobalDataProvider>
          {globalDataProps => (
            React.createElement(component, { ...globalDataProps })
          )}
        </GlobalDataProvider>
      </ApolloProvider>
    </Router>
  </ThemeProvider>
);

export default App;
