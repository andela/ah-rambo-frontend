import ReduxThunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import moxios from 'moxios';
import { articleWithoutDislike } from '../../helpers/__mocks__/articleResponses';
import removeArticleDislike from './removeArticleDislike';
import { ARTICLE_DISLIKE_SUCCESS } from '../../actionTypes';

describe('Action Creator for Removing Dislike on an Article', () => {
  const mockStore = configureStore([ReduxThunk]);

  beforeEach(() => moxios.install());
  afterEach(() => moxios.uninstall());

  it('dispatches success action when an article dislike is removed', async () => {
    const store = mockStore({});

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 200,
        response: { data: { message: 'like removed successfully' } },
      });
    });

    await store.dispatch(
      removeArticleDislike(articleWithoutDislike.article.slug)
    );
    expect(store.getActions()[1].type).toEqual(ARTICLE_DISLIKE_SUCCESS);
  });

  it('does not change the app state when a request to remove an article fails', async () => {
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

    await store.dispatch(
      removeArticleDislike(articleWithoutDislike.article.slug)
    );
    expect(store.getState()).toMatchObject(initialState);
  });
});
