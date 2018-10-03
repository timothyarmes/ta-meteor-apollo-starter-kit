import React from 'react';
import { Link } from 'react-router-dom';
import { propType } from 'graphql-anywhere';
import { userFragment } from '/imports/ui/apollo-client/user';
import SEO from '/imports/ui/components/smart/seo';
import withFormProps from '/imports/ui/render-props/withFormProps';
import AuthPageLayout from '/imports/ui/layouts/auth-page';
import { ResendVerificationLink } from '/imports/ui/components/smart/auth';
import Feedback from '/imports/ui/components/dumb/feedback';

//------------------------------------------------------------------------------
// COMPONENT:
//------------------------------------------------------------------------------
const LinkExpiredPage = ({
  curUser,
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
      label="here"
      disabled={disabled}
      onBeforeHook={handleBefore}
      onServerErrorHook={handleServerError}
      onSuccessHook={() => {
        // Extend withFormProps.handleSuccess' default functionality
        handleSuccess(() => {
          // Display success message after action is completed
          setSuccessMessage('A new email has been sent to your inbox!');
        });
      }}
    />
  );

  return (
    <AuthPageLayout title="The link has expired!">
      <p className="center">
        {curUser
          ? <span>Please, click {resendLink} to resend confirmation link.</span>
          : <span>Please, <Link to="/login">login</Link> to be able to resend confirmation link.</span>
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

const WrappedLinkExpiredPage = withFormProps(LinkExpiredPage);

export default ({ curUser }) => ([
  <SEO
    key="seo"
    schema="LinkExpired"
    title="Link Expired Page"
    description="A starting point for Meteor applications."
    contentType="product"
  />,

  <WrappedLinkExpiredPage key="linkExired" curUser={curUser} />,
]);
