import MockAdapter from 'axios-mock-adapter';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import thunk from 'redux-thunk';

import {
  getUserDetails,
  getUserArticles,
  userArticlesLoading,
  userDetailsLoading
} from './profile';

const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);
const mock = new MockAdapter(axios);

const userDetails = {};
userDetails.data = [
  {
    id: 21,
    slug: 'rambodevs-adventures-1',
    title: 'RamboDevs Adventures',
    description: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImlhdCI6MTU2NTg3OTA1NiwiZXhwIjoxNTY1OTY1NDU2fQ.pPCDoHAEAeFRvYj9cd7Lq8r2b-2ItS-WMNpD82eGu5Irem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et',
    image: 'http://res.cloudinary.com/teamrambo50/image/upload/v1567524113/pgkcpg4prdi5p2fpiorq.png',
    articleBody: 'dudududuudududuuduududdu',
    authorId: 25,
    categoryId: 1,
    likesCount: 0,
    dislikesCount: 0,
    publishedAt: '2019-09-03T11:48:23.319Z',
    isArchived: false,
    createdAt: '2019-09-03T11:48:23.337Z',
    updatedAt: '2019-09-03T11:48:23.337Z'
  }
];

const userData = {
  firstName: 'Deborah',
  lastName: 'Oke',
  userName: 'Debby',
  avatarUrl: 'https://res.cloudinary.com/teamrambo50/image/upload/v1565160704/avatar-1577909_1280_xsoxql.png',
  followingsCount: 0,
  followersCount: 0,
  location: 'Lagos Nigeria',
  createdAt: 'April, 2018'
};

describe('Profile Action Test', () => {
  it('get user article loading status equal true', () => {
    const data = true;
    const expectedAction = {
      type: 'GET_USER_ARTICLES_LOADING',
      data
    }

    const action = userArticlesLoading(data);
    expect(action).toEqual(expectedAction);
  });

  it('get user article loading status false', () => {
    const data = false;
    const expectedAction = {
      type: 'GET_USER_ARTICLES_LOADING',
      data
    }
    const action = userArticlesLoading(data);
    expect(action).toEqual(expectedAction);
  });

  it('get user loading status', () => {

    const data = true;
    const expectedAction = {
      type: 'GET_USER_DATA_LOADING',
      data
    }
    const action = userDetailsLoading(data);
    expect(action).toEqual(expectedAction);
  });


  it('when an error occours it throws an error', () => {
    const error = undefined;
    const data = true;
    const expectedAction = {
      type: 'GET_USER_ARTICLES_LOADING',
      data
    }
    const action = userArticlesLoading(error);
    expect(action).not.toEqual(expectedAction);
  });

  it('dispatch an action for getting user details', () => {
    mock.onGet(`https://authors-haven-development.herokuapp.com/api/v1/profiles/${userData.userName}`).reply(200, {
      type: "GET_USER_DETAILS",
      user: userData
    });

    const mockAction = [{
      type: 'GET_USER_DETAILS',
      data: userData
    }];

    const token = 'token';
    const store = mockStore({});
    const { userName } = userData;
    return store.dispatch(getUserDetails(token, userName)).then(() => expect(store.getActions()).toEqual(mockAction));
  });

  it('dispatch a successful action for getting all user articles', () => {
    mock.onGet('https://authors-haven-development.herokuapp.com/api/v1/articles/user').reply(200, {
      type: "GET_USER_ARTICLES",
      articles: userDetails.data
    });
    
   const mockAction = [{
      type: 'GET_USER_ARTICLES',
      data: userDetails.data
    }]

    const token = 'token';
    const store = mockStore({});
    return store.dispatch(getUserArticles(token)).then(() => expect(store.getActions()).toEqual(mockAction));
  });
  it('when an error occours, action for getting all user articles dispatch fails', () => {
    mock.onGet('https://authors-haven-development.herokuapp.com/api/v1/articles/user').reply(599, {
      type: "GET_USER_ARTICLES",
      articles: null 
    });
    
   const mockAction = [{
      type: 'GET_USER_ARTICLES',
      data: userDetails.data
    }]

    const token = 'token';
    const store = mockStore({});
    return store.dispatch(getUserArticles(token)).then(() => expect(store.getActions()).not.toEqual(mockAction));
  });


  it('when an error occours, action for getting  user details dispatch fails', () => {
    mock.onGet(`https://authors-haven-development.herokuapp.com/api/v1/profiles/${userData.userName}`).reply(599, {
      type: "GET_USER_DETAILS",
      articles: null 
    });
    
    const mockAction = [{
      type: 'GET_USER_DETAILS',
      data: userData
    }];

    const token = 'token';
    const store = mockStore({});
    const { userName } = userData;
    return store.dispatch(getUserDetails(token, userName)).then(() => expect(store.getActions()).not.toEqual(mockAction));
  });


});
