import React from 'react';

const Options = ({ options }) => (
  options.map((optionValue) => (
    <option
      key={optionValue}
      value={optionValue}
      label={optionValue}
    />
  ))
);

export default Options;
