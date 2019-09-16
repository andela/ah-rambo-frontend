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
  onBlur,
  onKeyPress,
  required,
  list,
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
      onBlur={onBlur}
      error={error}
      required={required}
      list={list}
      onKeyPress={onKeyPress}
    />
    {error && <span className="input-validation-error">{error}</span>}
  </div>
);

Input.defaultProps = {
  className: '',
  required: false,
  onChange: () => {},
  onFocus: () => {},
  onBlur: () => {},
  onKeyPress: () => {},
  error: '',
  list: '',
};


Input.propTypes = {
  type: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  className: PropTypes.string,
  onChange: PropTypes.func,
  onKeyPress: PropTypes.func,
  onFocus: PropTypes.func,
  onBlur: PropTypes.func,
  error: PropTypes.string,
  list: PropTypes.string,
  required: PropTypes.bool,
};


export default Input;
