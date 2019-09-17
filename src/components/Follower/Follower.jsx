/* eslint-disable require-jsdoc */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './Follower.scss';
import { connect } from 'react-redux';
import getUserFollower from '../../actions/user/userFolllowers';
import getUserFollowing from '../../actions/user/userFollowing';
import { Button } from '../common';
import { unfollow } from '../../actions/user/unfollow';
import { follow } from '../../actions/user/follow';

class Follower extends Component {
  state={
    followingData: [],
    followerData: []
  }

  async componentDidMount() {
    const { followerReducer: { followerData }, followingReducer: { followingData } } = this.props;

    await this.setState({
      followingData,
      followerData
    });
  }

  handleClick= (following, userid, username) => async (e) => {
    following ? this.handleUnFollowUser(userid, username) : this.handleFollowUser(userid, username);
  };

  handleFollowUser = async (userid, username) => {
    await this.props.follow(username);
    const newData = this.state.followerData.find((follower) => follower.followerId === userid);
    const newDataCopy = JSON.parse(JSON.stringify(newData));
    const { userId, followerId } = newDataCopy;
    newDataCopy.userId = followerId;
    newDataCopy.followerId = userId;

    await this.setState({
      followingData: [...this.state.followingData, newDataCopy],
    });
  };

  handleUnFollowUser = async (userid, username) => {
    await this.props.unfollow(username);
    const newData = this.state.followingData.find((follower) => follower.userId === userid);
    const newDataCopy = JSON.parse(JSON.stringify(newData));
    await this.setState({
      followingData: this.state.followingData.filter((data) => data.id !== newDataCopy.id),
    });
  };

  render() {
    const { followerData, followingData } = this.state;
    const following = followerData.filter((user) => followingData.find((users) => users.userId === user.followerId)).map(({ followerId }) => followerId);
    const showItems = () => followerData.map((item, i) => (
      <div key={i} className="flex cap">
        <img className="profile" src={item.follower.avatarUrl} alt="" />
        <div className="flex fig-bottom-container">
          <div className="flex column fig-bottom">
            <p className="author">
              {item.follower.firstName}
              {' '}
              {item.follower.lastName}
            </p>
            <p>
              {item.follower.userName}
            </p>
          </div>
        </div>
        <div className="flex fig-bottom-container cap">
          <div className="flex column fig-bottom">
            <Button
              className="edit-btn1"
              onClick={this.handleClick(following.includes(item.follower.id), item.follower.id, item.follower.userName)}
              label={following.includes(item.follower.id) ? 'unfollow' : 'follow'}
            />
          </div>
        </div>
      </div>
    ));
    return (
      <div className="container__follower">
        {showItems()}
      </div>
    );
  }
}

const mapState = (state) => {
  const {
    followingReducer, followerReducer, unFollowReducer, followReducer
  } = state;
  return {
    followingReducer, followerReducer, unFollowReducer, followReducer
  };
};
const actionCreators = {
  getUserFollowing,
  getUserFollower,
  unfollow,
  follow

};

export default connect(mapState, actionCreators)(Follower);
