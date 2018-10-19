import React from 'react';
import { compose, setDisplayName } from 'recompose';
import { withFormProps, withSEO } from '/app/ui/hocs';
import AuthPageLayout from '/app/ui/layouts/auth-page';
import { FormattedMessage as T, injectIntl } from 'react-intl';
import { ResendVerificationLink } from '/app/ui/components/smart/auth';
import Feedback from '/app/ui/components/dumb/feedback';

const WelcomePage = ({
  intl: { formatMessage: t },
  disabled,
  errorMsg,
  successMsg,
  setSuccessMessage,
  handleBefore,
  handleServerError,
  handleSuccess,
}) => {
  const resendLink = (
    <ResendVerificationLink
      label={t({ id: 'welcomeDidNotReceiveLinkText' })}
      disabled={disabled}
      onBeforeHook={handleBefore}
      onServerErrorHook={handleServerError}
      onSuccessHook={() => {
        // Extend withFormProps.handleSuccess' default functionality
        handleSuccess(() => {
          // Display success message after action is completed
          setSuccessMessage(t({ id: 'welcomeEmailSentMessage ' }));
        });
      }}
    />
  );

  return (
    <AuthPageLayout title="Thanks for joining!">
      <p className="center"><T id="welcomeCheckEmailMessage" /></p>
      <p className="center"><T id="welcomeDidNotReceiveMessage" values={{ resendLink }} /></p>
      <Feedback
        loading={disabled}
        errorMsg={errorMsg}
        successMsg={successMsg}
      />
    </AuthPageLayout>
  );
};

export default compose(
  injectIntl,
  withFormProps,
  withSEO({ title: 'welcomeHTMLTitle' }),
  setDisplayName('WelcomePage'),
)(WelcomePage);
