import ReduxThunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import { articleWithLike } from '../../helpers/__mocks__/articleResponses';
import addArticleLike from './addArticleLike';
import { ARTICLE_LIKE_SUCCESS } from '../../actionTypes';

describe('Action Creator for Adding Like to an Article', () => {
  const mockStore = configureStore([ReduxThunk]);

  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('dispatches success action when an article is successfully liked', async () => {
    const store = mockStore({});

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 201, response: articleWithLike });
    });

    await store.dispatch(addArticleLike(articleWithLike.article.slug));
    expect(store.getActions()[1].type).toEqual(ARTICLE_LIKE_SUCCESS);
  });

  it('does not change the app state when a request to like an article fails', async () => {
    const initialState = { article: {}, loading: false };
    const store = mockStore(initialState);

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 404,
        response: {
          errors: { error: 'article not found' },
        },
      });
    });

    await store.dispatch(addArticleLike(articleWithLike.article.slug));
    expect(store.getState()).toMatchObject(initialState);
  });
});
