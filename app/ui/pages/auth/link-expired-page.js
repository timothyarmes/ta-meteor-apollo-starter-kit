import React from 'react';
import { Link } from 'react-router-dom';
import { propType } from 'graphql-anywhere';
import userFragment from '/app/ui/apollo-client/user/fragment/user';
import withSEO from '/app/ui/hocs/with-seo';
import { compose } from 'recompose';
import { FormattedMessage as T, injectIntl } from 'react-intl';
import { withRouteProps, withFormProps } from '/app/ui/hocs/';
import AuthPageLayout from '/app/ui/layouts/auth-page';
import { ResendVerificationLink } from '/app/ui/components/smart/auth';
import Feedback from '/app/ui/components/dumb/feedback';

const LinkExpiredPage = ({
  intl: { formatMessage: t },
  curUser,
  disabled,
  errorMsg,
  successMsg,
  setSuccessMessage,
  handleBefore,
  handleServerError,
  handleSuccess,
  loginUrl,
}) => {
  const resendLink = (
    <ResendVerificationLink
      label={t({ id: 'linkExpiredResendLinkText' })}
      disabled={disabled}
      onBeforeHook={handleBefore}
      onServerErrorHook={handleServerError}
      onSuccessHook={() => {
        // Extend withFormProps.handleSuccess' default functionality
        handleSuccess(() => {
          // Display success message after action is completed
          setSuccessMessage(t({ id: 'linkExpiredLinkSent' }));
        });
      }}
    />
  );

  return (
    <AuthPageLayout title={t({ id: 'linkExpiredTitle' })}>
      <p className="center">
        {curUser
          ? <T id="linkExpiredResendLinkMessage" values={{ resendLink }} />
          : <T id="linkExpiredLoginLinkMessage" values={{ loginLink: <Link to={loginUrl()}><T id="linkExpiredLoginLinkText" /></Link> }} />
        }
      </p>
      <Feedback
        loading={disabled}
        errorMsg={errorMsg}
        successMsg={successMsg}
      />
    </AuthPageLayout>
  );
};

LinkExpiredPage.propTypes = {
  curUser: propType(userFragment),
};

LinkExpiredPage.defaultProps = {
  curUser: null,
};

export default compose(
  injectIntl,
  withRouteProps,
  withFormProps,
  withSEO({ title: 'linkExpiredHTMLTitle' }),
)(LinkExpiredPage);
