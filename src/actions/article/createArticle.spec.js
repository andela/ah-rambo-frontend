import * as createArticleActions from './createArticle';
import * as actionTypes from '../../actionTypes';
import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import { categories } from '../../helpers/__mocks__/articleData';

const middleWares = [thunk];
const mockStore = configureMockStore(middleWares);

const push = jest.fn();

describe('Create Article Actions Test', () => {
  it('returns data on success state', () => {
    const data = ['hello world'];
    const expectedState = {
      type: actionTypes.CREATE_ARTICLE_SUCCESS,
      data
    };
    expect(createArticleActions.CREATE_ARTICLE_SUCCESS(data)).toEqual(expectedState);
  });
  it('returns error on failure state', () => {
    const errors = 'You are a liar';
    const expectedState = {
      type: actionTypes.CREATE_ARTICLE_FAILURE,
      errors
    };
    expect(createArticleActions.CREATE_ARTICLE_FAILURE({errors})).toEqual(expectedState);
  });
  it('returns a loading state', () => {
    const expectedState = {
      type: actionTypes.CREATE_ARTICLE_REQUEST,
    };
    expect(createArticleActions.CREATE_ARTICLE_REQUEST()).toEqual(expectedState);
  });
  it('returns data on success state', () => {
    const error = ['hello world'];
    const expectedState = {
      type: actionTypes.CREATE_ARTICLE_FAILURE,
      error
    };
    expect(createArticleActions.CREATE_ARTICLE_SUCCESS(error)).not.toEqual(expectedState);
  });
  it('returns error on failure state', () => {
    const data = 'You are a liar';
    const expectedState = {
      type: actionTypes.CREATE_ARTICLE_SUCCESS,
      data
    };
    expect(createArticleActions.CREATE_ARTICLE_FAILURE(data)).not.toEqual(expectedState);
  });
});

describe('Actions API fetch test', () => {
  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('dispatches a success action when all data is supplied', async () => {
    const articleBody = {
      title: 'The Art Of Giving A Damn',
      status: 'draft',
      category: 'Hobby',
    };

    const articleResponse = {
      "image": "http://res.cloudinary.com/teamrambo50/image/upload/v1567524113/pgkcpg4prdi5p2fpiorq.png",
      "likesCount": 0,
      "dislikesCount": 0,
      "isArchived": false,
      "id": 103,
      "title": "The Art Of Giving A Damn",
      "authorId": 25,
      "publishedAt": null,
      "updatedAt": "2019-09-05T19:11:49.684Z",
      "createdAt": "2019-09-05T19:11:49.684Z",
      "slug": "the-art-of-giving-a-damn",
      "description": null,
      "articleBody": null,
      "tagList": [
          "undefined",
          "hobby"
      ],
      "category": {
          "id": 1,
          "name": "other"
      }
    }

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: articleResponse })
    })

    const mockAction = [{
      type: actionTypes.CREATE_ARTICLE_REQUEST,
    },{
      type: actionTypes.CREATE_ARTICLE_SUCCESS,
      data: articleResponse
    }];

    const store = mockStore({});
    await store.dispatch(createArticleActions.createArticle(articleBody, push));
    expect(store.getActions()).toEqual(mockAction);
  });
  it('dispatches a failure action when some data is missing', async () => {
    const articleBody = {
      title: 'The Art Of Giving A Damn',
    };

    const articleError = {
      data: {
        "errors": {
          "status": "status is required",
          "category": "category is required"
        }
      }
    }
      moxios.wait(() => {
        const request = moxios.requests.mostRecent();
        request.reject({ status: 400, response: articleError })
      })


    const expectedActions = [{
      type: actionTypes.CREATE_ARTICLE_REQUEST,
    },{
      type: actionTypes.CREATE_ARTICLE_FAILURE,
      errors: articleError.data.errors
    }];

    const store = mockStore({});
    await store.dispatch(createArticleActions.createArticle(articleBody, push));
     expect(store.getActions()).toEqual(expectedActions);
  });
  
  it('dispatches a failure action when some data is missing', async () => {
    const articleBody = {
      title: 'The Damn',
    };

    const articleError = {
      status: 422,
      errors: {
        category: "category is required"
      }
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject(articleError)
    });
  

    const mockAction = [{
      type: actionTypes.CREATE_ARTICLE_REQUEST,
    },{
      type: actionTypes.CREATE_ARTICLE_FAILURE,
      errors: ''
    }];

    const store = mockStore({});
    await store.dispatch(createArticleActions.createArticle(articleBody, push));
    expect(store.getActions()).toBeDefined();
  });

  it('gets tags on success', async () => {
    const tags = ['hello', 'hi'];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: { tags } })
    })

    const mockAction = [{
      type: actionTypes.GET_TAG,
      data: tags
    }];

    const store = mockStore({});
    await store.dispatch(createArticleActions.getTags());
    expect(store.getActions()).toEqual(mockAction);
  });

  it('returns false on failure', async () => {
    const tags = ['hello', 'hi'];

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({ status: 400, response: { tags } });
    })

    const store = mockStore({});
    await store.dispatch(createArticleActions.getTags());
    expect(store.getActions()).toBeDefined();
  });

  it('gets categories on success', async () => {
    const data = categories.map(({ name }) => name).sort();

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: { categories } })
    });

    const mockAction = [{
      type: actionTypes.GET_CATEGORY,
      data
    }];

    const store = mockStore({});
    await store.dispatch(createArticleActions.getCategories());
    expect(store.getActions()).toEqual(mockAction);
  });
  it('doesn\'t update categories on failure', async () => {
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.reject({ status: 500, response: {} })
    })

    const store = mockStore({});
    await store.dispatch(createArticleActions.getCategories());
    expect(store.getActions()).toBeDefined();
  });
});
