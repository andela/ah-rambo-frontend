import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Joi from 'joi-browser';
import queryString from 'query-string';
import resetPasswordInputSchema from '../../schemas/resetPassword';
import Input from '../common/Input/Input';
import { resetPasswordAction } from '../../actions/user/resetPassword';
import './ResetPassword.scss';
import Form from '../common/Form/Form';
import Button from '../common/Button/Button';

/**
 *
 *
 * @export {component} jsx
 * @class ResetPassword
 * @extends {Component}
 */
export class ResetPassword extends Component {
state = {
  password: '',
  confirmPassword: '',
  passwordError: '',
  confirmPasswordError: '',
  token: '',
  response: {}
};

/**
 * @returns {function} mount component
 *
 * @memberof ResetPassword
 */
componentDidMount = () => {
  const { props: { location: { search } } } = this;
  const { token } = queryString.parse(search);
  this.setState({ token });
}

getValidationErrorMessages = (error) => {
  const validationErrors = {};
  const errorDetails = error.details;

  for (let i = errorDetails.length - 1; i >= 0; i -= 1) {
    const errorDetail = errorDetails[i];
    const input = errorDetail.path[0];
    validationErrors[input] = errorDetail.message;
  }

  const {
    password: passwordError,
    confirmPassword: confirmPasswordError
  } = validationErrors;
  return { passwordError, confirmPasswordError };
};

validateInput = (password, confirmPassword) => {
  const VALIDATION_OPTION = { abortEarly: false };
  const { error } = Joi.validate({ password, confirmPassword },
    resetPasswordInputSchema, VALIDATION_OPTION);
  if (!error) return null;
  return this.getValidationErrorMessages(error);
};

handleChange = (event) => {
  const { target: { name, value } } = event;
  this.setState({
    [name]: value.trim()
  });
}

handleFocus = ({ target: { name } }) => {
  this.setState({
    [`${name}Error`]: '', response: { }
  });
}

handleSubmit = async (event) => {
  event.preventDefault();
  const {
    state: { password, confirmPassword, token },
    props: { resetPassword },
    validateInput
  } = this;
  const { passwordError, confirmPasswordError } = validateInput(password,
    confirmPassword) || {};
  if (passwordError || confirmPasswordError) {
    this
      .setState({ passwordError, confirmPasswordError });
  }
  if (password && confirmPassword && !confirmPasswordError && !passwordError) {
    await resetPassword({ password, confirmPassword }, token);
    const { props: { error, message } } = this;
    this.setState({ response: { error } });
    if (!error) {
      this.setState({ response: { message } });
    }
  }
}


/**
 *
 *
 * @returns
 * @memberof ResetPassword
 */
render() {
  const {
    props: { isLoading },
    state: {
      passwordError, confirmPasswordError, password,
      confirmPassword, response
    },
    handleChange, handleSubmit, handleFocus
  } = this;


  return (
    <main className="container">
      <div className="main">
        <div className="form-wrapper">
          <div className="reset__password__form">
            <div>
              <h1>Enter New Password</h1>
            </div>
            <Form className="form" onSubmit={handleSubmit}>
              <Input
                type="password"
                name="password"
                value={password}
                error={passwordError}
                placeholder="Enter new password"
                className={`input ${passwordError ? 'has-validation-error' : ''}`}
                onChange={handleChange}
                onFocus={handleFocus}
                id="password"
              />
              <Input
                type="password"
                name="confirmPassword"
                value={confirmPassword}
                error={confirmPasswordError}
                placeholder="Confirm new password"
                className={`input ${confirmPasswordError ? 'has-validation-error' : ''}`}
                onChange={handleChange}
                onFocus={handleFocus}
                id="confirmPassword"
              />
              { response.error && (
                <p className="center input-validation-error">
                  {response.error}
                </p>
              )}
              {response.message && (
                <p className="center success-message">
                  {'password reset successfully'}
                </p>
              )}
              <div className="form-field">
                <Button
                  className="btn"
                  title="Please fill up the form"
                  disabled={isLoading}
                  label={isLoading ? 'Please wait...' : 'Submit'}
                />
              </div>
            </Form>
          </div>
        </div>
      </div>
    </main>
  );
}
}

const mapStateToProps = (state) => state.resetPassword;

const mapDispatchToProps = {
  resetPassword: resetPasswordAction
};

export default connect(mapStateToProps, mapDispatchToProps)(ResetPassword);

ResetPassword.defaultProps = {
  error: '',
  message: '',
  isLoading: false,
  resetPassword: () => {}
};

ResetPassword.propTypes = {
  resetPassword: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  message: PropTypes.string,
};
