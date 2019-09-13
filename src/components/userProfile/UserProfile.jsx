import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import getUserArticles from '../../actions/article/getUserArticles';

import { dashBoardNavItems, sideNavItems } from './viewProfileData';

import SideNav from '../SideNav/SideNav';
import UserDataCard from '../UserDataCard/UserDataCard';
import DashBoardNav from '../DashBoardNav/DashBoardNav';
import UserArticles from '../UserArticles/UserArticles';
import Spinner from '../Spinner/spinner';
import './UserProfile.scss';

/**
 *
 *
 * @export
 * @class UserProfile
 * @extends {Component}
 */
export class UserProfile extends Component {
  /**
   *
   * @returns {object} Authenticated user and get their articles
   * @memberof UserProfile
   */
  componentDidMount() {
    this.props.getUserArticles();
  }

  /**
   *
   * @returns {object} reirect user to login on expired token
   * @memberof UserProfile
   */

  renderArticleError = (articleError) => articleError && (
    this.props.history.push('/login')
  );

  /**
   *
   * @returns {object} reirect user to login on expired token
   * @memberof UserProfile
   */

  renderUserError = (userError) => userError && (
    this.props.history.push('/notfound')
  );

  /**
   *
   *
   * @returns {HTML} HTML markup of the userProfile
   * @memberof UserProfile
   */
  render() {

    const {
      articleData, userData, userLoading,
      articleLoading, userError, articleError
    } = this.props;
    const loadingStatus = userLoading || articleLoading;
    if (loadingStatus === true) {
      return (
        <div className="container">
          <div>
            <Spinner />
          </div>
        </div>
      );
    }

    {
      this.renderArticleError(articleError);
      this.renderUserError(userError);
    }
    return (
      <div>
        <div className="profile__container">
          <aside>
            <SideNav
              items={sideNavItems}
            />
          </aside>
          { Object.getOwnPropertyNames(userData).length !== 0 ? (
            <main className="User__data">
              <UserDataCard
                userDetails={userData}
                total={articleData.total}
              />
              <DashBoardNav
                items={dashBoardNavItems}
              />
              { articleData !== undefined ? (
                <UserArticles
                  data={articleData.data}
                  authorData={userData}
                  articleUrl="login"
                />
              ) : ''}
            </main>
          ) : '' }
        </div>
      </div>
    );
  }
}
UserProfile.propTypes = {
  userData: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    userName: PropTypes.string,
    avatarUrl: PropTypes.string,
    followingsCount: PropTypes.number,
    followersCount: PropTypes.number,
    location: PropTypes.string,
    createdAt: PropTypes.instanceOf(Date)
  }),
  articleData: PropTypes.shape({
    total: PropTypes.number,
    data: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.number,
      slug: PropTypes.string,
      title: PropTypes.string,
      description: PropTypes.string,
      image: PropTypes.string,
      articleBody: PropTypes.string,
      authorId: PropTypes.number,
      categoryId: PropTypes.number,
      likesCount: PropTypes.number,
      dislikesCount: PropTypes.number,
      publishedAt: PropTypes.string,
      isArchived: PropTypes.bool,
      createdAt: PropTypes.string,
      updatedAt: PropTypes.string
    }))
  }),
  userLoading: PropTypes.bool,
  articleLoading: PropTypes.bool,
  getUserArticles: PropTypes.func.isRequired,
  userError: PropTypes.shape({
    error: PropTypes.string
  }),
  articleError: PropTypes.shape({
    message: PropTypes.string
  }),
};

UserProfile.defaultProps = {
  articleLoading: true,
  userLoading: true,
  userData: {},
  articleData: {
    data: [],
    total: 0
  },
  articleError: {
    message: null
  },
  userError: {
    error: null
  }
};

const mapStateToProps = (state) => {
  const { user, article } = state;
  const {
    userData,
    userLoading,
    userError
  } = user;
  const {
    articleLoading,
    articleData,
    articleError
  } = article;
  return {
    articleLoading,
    articleData,
    articleError,
    userData,
    userLoading,
    userError,
  };
};

const mapDispatchToProps = (dispatch) => bindActionCreators({
  getUserArticles,
}, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(UserProfile);
