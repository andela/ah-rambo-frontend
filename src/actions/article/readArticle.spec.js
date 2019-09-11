import ReduxThunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import getArticle from '../../actions/article/readArticle';
import {
  GET_ARTICLE_FAILURE,
  GET_ARTICLE_REQUEST,
  GET_ARTICLE_SUCCESS
} from '../../actionTypes';

describe('Interaction with Redux Store Tests', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  const middleware = [ReduxThunk];
  const mockStore = configureStore(middleware);

  it('returns an error when there is an error in getting the article', () => {
    const store = mockStore({});
    const expectedState = {};

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        status: 400,
        response: expectedState
      });
    });


    return store.dispatch(getArticle()).then(() => {
      const actions = store.getActions();
      expect(actions[1].type).toBe(GET_ARTICLE_FAILURE);
    });
  });

  it('pushes the user to 404 page when article is not found', () => {
    const store = mockStore({});
    const expectedState = {
        error: 'article not found'
    };
    const history = {
      push: jest.fn()
    };

    const slug = 'slug';

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        status: 404,
        response: expectedState
      });
    });

    return store.dispatch(getArticle(slug, history)).then(() => {
      const actions = store.getActions();
      expect(actions[1].type).toBe(GET_ARTICLE_FAILURE);
      expect(history.push).toHaveBeenCalled();
    });
  });

  it('dispatches the getArticle request function when it mounts', () => {
    const store = mockStore({});
    const expectedState = {};

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        status: 200,
        response: expectedState
      });
    });

    return store.dispatch(getArticle()).then(() => {
      const actions = store.getActions();
      expect(actions[0].type).toBe(GET_ARTICLE_REQUEST);
    });
  });

  it('dispatches the get article success action on success', () => {
    const store = mockStore({});
    const expectedState = {
      title: 'John'
    };

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();

      request.respondWith({
        status: 200,
        response: expectedState
      });
    });

    return store.dispatch(getArticle()).then(() => {
      const actions = store.getActions();
      expect(actions[1].type).toBe(GET_ARTICLE_SUCCESS);
    });
  });
});
