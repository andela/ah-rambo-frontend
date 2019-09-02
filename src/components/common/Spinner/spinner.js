import React from 'react';
import './spinner.scss';

const Spinner = () => (
  <div>
    <div className="loading-bar">
      <div className="lds-grid">
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
        <div />
      </div>
    </div>
  </div>
);
export default Spinner;
