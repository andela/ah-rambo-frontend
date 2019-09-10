import React from 'react';
import PropTypes from 'prop-types';
import './Input.scss';

const Input = ({
  type,
  value,
  name,
  placeholder,
  className,
  onChange,
  onFocus,
  error,
}) => (
  <div className="form-field">
    <input
      type={type}
      value={value}
      name={name}
      placeholder={placeholder}
      id={name}
      className={className}
      onChange={onChange}
      onFocus={onFocus}
      error={error}
    />
    {error && <span className="input-validation-error">{error}</span>}
  </div>
);

Input.defaultProps = {
  className: '',
  onChange: () => {},
  onFocus: () => {},
  error: '',
};

Input.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onFocus: PropTypes.func,
  error: PropTypes.string,
};

export default Input;
