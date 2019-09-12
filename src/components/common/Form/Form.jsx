/* eslint-disable require-jsdoc */
import React from 'react';
import PropTypes from 'prop-types';
import './Form.scss';

const Form = ({ className, children, onSubmit }) => (
  <form className={className} onSubmit={onSubmit}>
    {children}
  </form>
);

Form.defaultProps = {
  className: 'form',
};

Form.propTypes = {
  className: PropTypes.string,
  children: PropTypes.arrayOf(PropTypes.oneOfType([PropTypes
    .object, PropTypes.node])).isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default Form;
