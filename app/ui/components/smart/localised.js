import React from 'react';
import PropTypes from 'prop-types';
import { IntlProvider, injectIntl } from 'react-intl';
import { compose, withProps, setDisplayName } from 'recompose';
import { withLocaleProps } from '/app/ui/hocs';

// Use Localised to wrap a part of your app that uses a specific section of the translation file
// e.g. <Localised section="admin"><Admin /><Localised />

const Localised = ({ locale: { locale, messages }, children, ...props }) => (
  <IntlProvider locale={locale} messages={messages}>
    { React.cloneElement(children, props) }
  </IntlProvider>
);

Localised.propTypes = {
  section: PropTypes.string.isRequired,
  children: PropTypes.element.isRequired,
};

export default compose(
  injectIntl,
  withProps(({ intl: { locale } }) => ({ locale, section: 'admin' })),
  withLocaleProps,
  setDisplayName('Localised'),
)(Localised);
