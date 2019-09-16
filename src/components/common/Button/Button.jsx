/* eslint-disable react/button-has-type */
import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({
  className, title, disabled, name, label, onClick, type, onPointerDown
}) => (
  <button
    type={type}
    name={name}
    id={name}
    className={className}
    title={title}
    disabled={disabled}
    onClick={onClick}
    onPointerDown={onPointerDown}
  >
    {label}
  </button>
);

Button.defaultProps = {
  title: '',
  disabled: false,
  name: '',
  onClick: () => {},
  onPointerDown: () => {},
  type: 'submit'
};

Button.propTypes = {
  className: PropTypes.string.isRequired,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  type: PropTypes.string,
  label: PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
  onClick: PropTypes.func,
  onPointerDown: PropTypes.func
};

export default Button;
