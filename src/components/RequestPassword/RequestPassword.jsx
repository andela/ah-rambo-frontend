
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Joi from 'joi-browser';
import PropTypes from 'prop-types';
import {
  GoogleIcon, FacebookIcon, TwitterIcon,
} from '../../../assets/icons';
import Form from '../common/Form/Form';
import './RequestPassword.scss';
import requestPasswordInputSchema from '../../schemas/requestPassword';
import requestPasswordAction from '../../actions/user/requestPassword';
import Input from '../common/Input/Input';
import Button from '../common/Button/Button';

/**
 * @returns {component} jsx
 *
 * @export
 * @class RequestPassword
 * @extends {Component}
 */
export class RequestPassword extends Component {
  state = {
    email: '',
    emailError: '',
    response: {}
  };

  validateInput = (email) => {
    const VALIDATION_OPTION = { abortEarly: false };
    const { error } = Joi.validate({ email },
      requestPasswordInputSchema, VALIDATION_OPTION);
    if (!error) return null;
    const { details: [errorDetails] } = error;
    return errorDetails.message;
  };

handleChange = (event) => {
  const { target: { name, value } } = event;
  this.setState({
    [name]: value.trim()
  });
}

handleFocus = () => {
  this.setState({ emailError: '', response: {} });
}

 handleSubmit = async (event) => {
   event.preventDefault();
   const { state: { email }, props: { requestPassword }, validateInput } = this;
   const emailError = validateInput(email);
   if (emailError) this.setState({ emailError });
   if (email && !emailError) {
     await requestPassword(email);
     const { props: { error, message } } = this;
     this.setState({ response: { error, message } });
   }
 }

 /**
  *
  * @
  * @returns
  * @memberof RequestPassword
  */
 render() {
   const {
     props: { isLoading },
     state: { email, emailError, response },
     handleSubmit, handleChange, handleFocus
   } = this;

   return (
     <main className="container">
       <div className="Request">
         <section className="Request__info">
           <h2 className="Request__info__header">
            Inspire the next generation of users by
             <br />
            continuously voicing your innovative ideas
           </h2>
           <p className="Request__info__text">Join the world&apos;s largest community of writers and readers</p>
           <p className="Request__info__text">20M+ active users</p>
           <p className="Request__info__text">Over 2000+ new stories daily</p>
           <p className="Request__info__text">No hidden charges. Get started for free now!</p>
         </section>
         <div className="Request__form">
           <p className="Request__form__header">Forgot Password?</p>

           <Form className="form" onSubmit={handleSubmit}>
             <Input
               type="text"
               name="email"
               className={`input ${emailError ? 'has-validation-error' : ''}`}
               value={email}
               error={emailError}
               placeholder="Email address"
               onChange={handleChange}
               onFocus={handleFocus}
             />
             {response.error
           && (
             <p className="center input-validation-error">
               {response.error}
             </p>
           )}
             { response.message && (
               <p className="center success-message">
         Reset link sent to your email address
               </p>
             )}
             <div className="form-field">
               <Button
                 title="Please fill up the form"
                 disabled={isLoading}
                 className="btn Request__btn"
                 label={isLoading ? 'Please wait...' : 'Submit'}
               />
             </div>
           </Form>

           <div className="form__footer">
             <span className="social-requests">
          Continue with:
               <img className="icon-size" src={FacebookIcon} title="Facebook" alt="Facebook" />
               <img className="icon-size" src={GoogleIcon} title="Google" alt="Google" />
               <img className="icon-size" src={TwitterIcon} title="Twitter" alt="Twitter" />
             </span>
             <span>
      Don&lsquo;t have an account?
               <Link to="/signup" className="signup__link">Sign up</Link>
             </span>
           </div>
         </div>
       </div>
     </main>

   );
 }
}

const mapStateToProps = (state) => state.requestPassword;

const mapDispatchToProps = {
  requestPassword: requestPasswordAction
};

export default connect(mapStateToProps, mapDispatchToProps)(RequestPassword);

RequestPassword.defaultProps = {
  error: '',
  message: '',
  isLoading: false,
  requestPassword: () => {}
};

RequestPassword.propTypes = {
  requestPassword: PropTypes.func,
  isLoading: PropTypes.bool,
  error: PropTypes.string,
  message: PropTypes.string,
};
