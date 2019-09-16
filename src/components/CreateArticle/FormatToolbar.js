import React, { Component } from 'react';
import PropTypes from 'prop-types';

const FormatToolbar = ({ children }) => <div className="toolbar">{ children }</div>;

FormatToolbar.propTypes = {
  children: PropTypes.node.isRequired
};

export default FormatToolbar;
