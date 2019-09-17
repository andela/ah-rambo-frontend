import React from 'react';
import { Link } from 'react-router-dom';
import './Following.scss';
import { connect } from 'react-redux';
import getUserFollowing from '../../actions/user/userFollowing';
import getUserFollower from '../../actions/user/userFolllowers';
import { Button } from '../common';


const Following = (props) => {
  const { followingReducer: { followingData } } = props;
  const showItems = () => followingData.map((item, i) => (
    <div key={i} className="flex cap">
      <img className="profile" src={item.following.avatarUrl} alt="" />
      <div className="flex fig-bottom-container">
        <div className="flex column fig-bottom">
          <p className="author">
            {item.following.firstName}
            {' '}
            {item.following.lastName}
          </p>
          <p>
            {item.following.userName}
          </p>
        </div>
      </div>
      <div className="flex fig-bottom-container cap">
        <div className="flex column fig-bottom">
          <Button className="edit-btn1" label="following" />
        </div>
      </div>
    </div>
  ));
  return (
    <div className="container__following">
      {showItems()}
    </div>
  );
};
// const mapState = (state) => state.followingReducer;
const mapState = (state) => {
  const { followingReducer, followerReducer } = state;
  return { followingReducer, followerReducer };
};
const actionCreators = {
  getUserFollowing,
  getUserFollower
};

export default connect(mapState, actionCreators)(Following);
