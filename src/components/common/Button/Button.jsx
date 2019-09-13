import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

const Button = ({
  className, title, disabled, name, label, onClick
}) => (
  <button
    type="submit"
    name={name}
    id={name}
    className={className}
    title={title}
    disabled={disabled}
    onClick={onClick}
  >
    {label}
  </button>
);

Button.defaultProps = {
  title: '',
  disabled: false,
  name: '',
  onClick: () => {},
};

Button.propTypes = {
  className: PropTypes.string.isRequired,
  title: PropTypes.string,
  disabled: PropTypes.bool,
  name: PropTypes.string,
  label: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

export default Button;
