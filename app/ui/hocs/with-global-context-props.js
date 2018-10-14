import React from 'react';
import { GlobalDataContext } from '/app/ui/components/smart/route-wrappers/global-data-provider';

// Adds GlobalDataContext to the props of the wrapped page.

const withGlobalContextProps = WrappedComponent => props => (
  <GlobalDataContext.Consumer>
    {globalContext => <WrappedComponent {...props} {...globalContext} />}
  </GlobalDataContext.Consumer>
);

export default withGlobalContextProps;
