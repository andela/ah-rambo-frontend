<<<<<<< HEAD
=======
/* eslint-disable require-jsdoc */
>>>>>>> Feature-[167190489]: user signup
import React from 'react';
import PropTypes from 'prop-types';
import './Form.scss';

const Form = ({ className, children, onSubmit }) => (
  <form className={className} onSubmit={onSubmit}>
    {children}
  </form>
);

Form.defaultProps = {
  className: '',
};

Form.propTypes = {
  className: PropTypes.string,
  children: PropTypes.array.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
