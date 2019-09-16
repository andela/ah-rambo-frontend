import React from 'react';
import { connect } from 'react-redux';

const success = () => {
  return <div className="test">Article Successfully Created</div>;
};

const mapStateToProps = (state) => ({
  data: state
});

export default connect(
  mapStateToProps
)(success);
