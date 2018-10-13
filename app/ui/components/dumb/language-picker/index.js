import React from 'react';
import { compose } from 'recompose';
import { withRouter, Link } from 'react-router-dom';
import { FormattedMessage as T } from 'react-intl';
import styled from 'styled-components';
import withRouteProps from '/app/ui/hocs/with-route-props';

const StyledLink = styled(Link)`
  color: white;
  font-variant: small-caps;
`;

const LanguagePicker = ({ className, toUrlWithlocale }) => (
  <div className={className}>
    <StyledLink to={toUrlWithlocale('en')}><T id="langsEn" /></StyledLink>
    &nbsp;|&nbsp;
    <StyledLink to={toUrlWithlocale('fr')}><T id="langsFr" /></StyledLink>
  </div>
);

const StyledLanguagePicker = styled(LanguagePicker)`
  padding: 0 20px;
`;

export default compose(withRouter, withRouteProps)(StyledLanguagePicker);
