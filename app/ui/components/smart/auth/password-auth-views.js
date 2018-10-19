import React from 'react';
import PropTypes from 'prop-types';
import { FormattedMessage as T, injectIntl } from 'react-intl';
import { compose } from 'recompose';
import { withApollo } from 'react-apollo';
import { loginWithPassword, createUser, forgotPassword, resetPassword } from '/app/ui/apollo-client/auth';
import Form from '/app/ui/components/dumb/form';
import Fieldset from '/app/ui/components/dumb/fieldset';
import Label from '/app/ui/components/dumb/label';
import Input from '/app/ui/components/dumb/input';
import Message from '/app/ui/components/dumb/message';
import Button from '/app/ui/components/dumb/button';
import ErrorHandling from '/app/api/error-handling';
import sendVerificationEmail from '/app/ui/apollo-client/auth/send-verification-email';

const VIEWS = {
  login: { fields: ['email', 'password'] },
  signup: { fields: ['email', 'password'] },
  forgotPassword: { fields: ['email'] },
  resetPassword: { fields: ['password'] },
};

class PasswordAuthViews extends React.Component {
  state = {
    email: '',
    password: '',
    errors: { email: [], password: [] },
  }

  constructor(props) {
    super(props);
    this.cancellable = { setState: this.setState.bind(this) };
  }

  componentWillUnmount = () => {
    this.cancellable.setState = undefined;
  }

  // Whether or not the given field is present in the current view.
  isActiveField = (field) => {
    const { view } = this.props;

    // Get list of active fields for the current view ('email' and/or 'password')
    const activeFields = VIEWS[view].fields;

    // Return whether or not the given field is present in the active list
    return activeFields.indexOf(field) !== -1;
  }

  handleChange = (evt) => {
    const field = evt.target.id;
    const { value } = evt.target;
    const { errors } = this.state;

    // Update value and clear errors for the given field
    this.setState({
      [field]: value,
      errors: ErrorHandling.clearErrors(errors, field),
    });
  }

  validateFields = ({ email, password }) => {
    const { intl: { formatMessage: t } } = this.props;

    // Initialize errors
    const errors = {
      email: [],
      password: [],
    };

    const MIN_CHARS = 6;
    const MAX_CHARS = 30;

    if (this.isActiveField('email')) {
      // Sanitize input
      const _email = email && email.trim(); // eslint-disable-line no-underscore-dangle

      if (!_email) {
        errors.email.push(t({ id: 'emailRequiredError' }));
      } else if (!ErrorHandling.isValidEmail(_email)) {
        errors.email.push(t({ id: 'invalidEmailError' }));
      } else if (_email.length > MAX_CHARS) {
        errors.email.push(t({ id: 'maxEmailLengthError' }, { num: MAX_CHARS }));
      }
    }

    if (this.isActiveField('password')) {
      // Do not sanitize password, spaces are valid characters in this case
      if (!password) {
        errors.password.push(t({ id: 'passwordRequireError' }));
      } else if (password.length < MIN_CHARS) {
        errors.password.push(t({ id: 'passwordTooShortError' }, { num: MIN_CHARS }));
      } else if (password.length > MAX_CHARS) {
        errors.password.push(t({ id: 'passwordTooLongError' }, { num: MAX_CHARS }));
      }
    }

    return errors;
  }

  handleSubmit = async (evt) => {
    evt.preventDefault();

    const {
      view,
      token,
      onBeforeHook,
      onClientErrorHook,
      onServerErrorHook,
      onSuccessHook,
    } = this.props;

    // Run before logic if provided and return on error
    try {
      onBeforeHook();
    } catch (exc) {
      return; // return silently
    }

    // Get field values
    const { email, password } = this.state;

    // Clear previous errors if any
    this.setState({ errors: { email: [], password: [] } });

    // Validate fields
    const err1 = this.validateFields({ email, password });

    // In case of errors, display on UI and return handler to parent component
    if (ErrorHandling.hasErrors(err1)) {
      this.setState({ errors: err1 });
      onClientErrorHook(err1);
      return;
    }

    const { client: apolloClient } = this.props;
    try {
      switch (view) {
        case 'login': {
          await loginWithPassword({ email, password }, apolloClient);
          break;
        }
        case 'signup': {
          // In case of signup, send verification email on success response
          await createUser({ email, password }, apolloClient);
          sendVerificationEmail({}, apolloClient).then(() => {}).catch(() => {});
          break;
        }
        case 'forgotPassword': {
          await forgotPassword({ email }, apolloClient);
          break;
        }
        case 'resetPassword': {
          await resetPassword({ token, newPassword: password }, apolloClient);
          break;
        }
        default:
          onClientErrorHook('Unknown view option!', view);
          break;
      }

      const { setState } = this.cancellable;
      if (setState) setState({ email: '', password: '' });

      onSuccessHook();
    } catch (err) {
      onServerErrorHook(err);
    }
  }

  render() {
    const { email, password, errors } = this.state;
    const { btnLabel, disabled } = this.props;

    return (
      <Form onSubmit={this.handleSubmit} className="my2">
        {this.isActiveField('email') && (
          <Fieldset className="mt2">
            <Label htmlFor="email">
              <T id="emailLabel" />
            </Label>
            <Input
              id="email"
              type="text"
              placeholder="Email"
              value={email}
              onChange={this.handleChange}
            />
            <Message
              type="error"
              content={ErrorHandling.getFieldErrors(errors, 'email')}
            />
          </Fieldset>
        )}
        {this.isActiveField('password') && (
          <Fieldset className="mt2">
            <Label htmlFor="password">
              <T id="passwordLabel" />
            </Label>
            <Input
              id="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={this.handleChange}
            />
            <Message
              type="error"
              content={ErrorHandling.getFieldErrors(errors, 'password')}
            />
          </Fieldset>
        )}
        <Fieldset className="mt3">
          <Button
            type="submit"
            variant="primary"
            disabled={disabled}
            size="large"
            expanded
          >
            {btnLabel}
          </Button>
        </Fieldset>
      </Form>
    );
  }
}

PasswordAuthViews.propTypes = {
  view: PropTypes.oneOf(Object.keys(VIEWS)).isRequired,
  token: PropTypes.string,
  btnLabel: PropTypes.string,
  disabled: PropTypes.bool,
  onBeforeHook: PropTypes.func,
  onClientErrorHook: PropTypes.func,
  onServerErrorHook: PropTypes.func,
  onSuccessHook: PropTypes.func,
  client: PropTypes.object, // from withApollo
};

PasswordAuthViews.defaultProps = {
  token: '',
  btnLabel: 'Submit',
  disabled: false,
  onBeforeHook: () => {},
  onClientErrorHook: () => {},
  onServerErrorHook: () => {},
  onSuccessHook: () => {},
};

// Apollo integration

export default compose(
  withApollo,
  injectIntl,
)(PasswordAuthViews);
