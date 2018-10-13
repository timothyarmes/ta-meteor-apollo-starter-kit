import React from 'react';
import { injectIntl } from 'react-intl';
import { compose } from 'recompose';
import withSEO from '/app/ui/hocs/with-seo';
import AuthPageLayout from '/app/ui/layouts/auth-page';
import Localised from '/app/ui/components/smart/localised';

const InnerAdmin = ({ intl: { formatMessage: t }, curUser }) => (
  <AuthPageLayout
    key="view"
    title={t({ id: 'adminTitle' })}
  >
    <pre style={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>
      {JSON.stringify(curUser, null, 2)}
    </pre>
  </AuthPageLayout>
);

const WrappedInnerAdmin = compose(
  injectIntl,
  withSEO({ title: 'adminHTMLTitle' }),
)(InnerAdmin);

const LocalisedAdminPage = props => (
  <Localised section="admin"><WrappedInnerAdmin {...props} /></Localised>
);

export default LocalisedAdminPage;
