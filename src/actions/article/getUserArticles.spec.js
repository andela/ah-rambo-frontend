import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';

import getUserArticles from './getUserArticles';

const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);

const userArticleDetails = {
  total: 0,
  data: [
    {
      id: 21,
      slug: 'rambodevs-adventures-1',
      title: 'RamboDevs Adventures',
      description:
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImlhdCI6MTU2NTg3OTA1NiwiZXhwIjoxNTY1OTY1NDU2fQ.pPCDoHAEAeFRvYj9cd7Lq8r2b-2ItS-WMNpD82eGu5Irem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et',
      image:
        'http://res.cloudinary.com/teamrambo50/image/upload/v1567524113/pgkcpg4prdi5p2fpiorq.png',
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
  ]
};

const userData = {
  firstName: 'Deborah',
  lastName: 'Oke',
  userName: 'Debby',
  avatarUrl:
    'https://res.cloudinary.com/teamrambo50/image/upload/v1565160704/avatar-1577909_1280_xsoxql.png',
  followingsCount: 0,
  followersCount: 0,
  location: 'Lagos Nigeria',
  createdAt: 'April, 2018'
};

const user = {
  user: userData
};

const error = {
  error: 'user unauthorized'
};

beforeAll(() => {
  localStorage.setItem('username', userData.userName);
});

afterAll(() => {
  localStorage.removeItem('username');
});
beforeEach(() => {
  moxios.install();
});
afterEach(() => {
  moxios.uninstall();
});

describe('Get user action test', () => {
  it('dispatch an action for getting user articles', async () => {
    const expectedAction = [
      { type: 'GET_USER_ARTICLES_REQUEST' },
      { type: 'GET_USER_ARTICLES_SUCCESS', articles: userArticleDetails }
    ];

    const articles = {
      articles: userArticleDetails
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: articles });
    });

    const store = mockStore({});
    await store.dispatch(getUserArticles());
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('dispatch a failure action and fails to get user articles', async () => {
    const expectedAction = [
      { type: 'GET_USER_ARTICLES_REQUEST' },
      { type: 'GET_USER_ARTICLES_FAILURE', articleError: error }
    ];

    const articles = {
      articles: userArticleDetails
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 401, response: error });
    });

    const store = mockStore({});
    await store.dispatch(getUserArticles());
    expect(store.getActions()).toEqual(expectedAction);
  });
});
