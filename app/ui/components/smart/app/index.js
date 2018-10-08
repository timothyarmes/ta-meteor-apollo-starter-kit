import React from 'react';
import { ApolloProvider } from 'react-apollo';
import { ThemeProvider } from 'styled-components';
import theme from '/app/ui/theme';
import GlobalDataProvider from '/app/ui/components/smart/route-wrappers/global-data-provider';

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
