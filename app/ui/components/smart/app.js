import React from 'react';
import { IntlProvider } from 'react-intl';
import { ThemeProvider } from 'styled-components';
import theme from '/app/ui/theme';
import GlobalDataProvider from '/app/ui/components/smart/route-wrappers/global-data-provider';
import withLocaleProps from '/app/ui/hocs/with-locale-props';

const App = ({ component, locale: { locale, messages } }) => (
  <ThemeProvider theme={theme}>
    <IntlProvider locale={locale} messages={messages}>
      <GlobalDataProvider>
        { React.createElement(component) }
      </GlobalDataProvider>
    </IntlProvider>
  </ThemeProvider>
);

export default withLocaleProps(App);
