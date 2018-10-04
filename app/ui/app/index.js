import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'styled-components';
import theme from '../theme';
import GlobalDataProvider from '../global-data-provider';

const App = ({ component, apolloClient }) => (
  <ThemeProvider theme={theme}>
    <ApolloProvider client={apolloClient}>
      <GlobalDataProvider>
        {globalDataProps => (
          React.createElement(component, { ...globalDataProps })
        )}
      </GlobalDataProvider>
    </ApolloProvider>
  </ThemeProvider>
);

export default App;
