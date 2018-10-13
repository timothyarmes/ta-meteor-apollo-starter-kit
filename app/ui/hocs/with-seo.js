import React from 'react';
import SEO from '/app/ui/components/smart/seo';

// Adds SEO options to the  HTML of the current page.
// Needs to be wrapped in an injectIntl HOC

const withSEO = ({ schema, title, description, contentType }) => WrappedComponent => (props) => {
  const { intl: { formatMessage: t } } = props;
  return ([
    <SEO
      key="seo"
      schema={schema || 'WebSite'}
      title={t({ id: title })}
      description={description ? t({ id: description }) : t({ id: 'siteHTMLDescription' })}
      contentType={contentType}
    />,

    <WrappedComponent key="comp" {...props} />,
  ]);
};

export default withSEO;
