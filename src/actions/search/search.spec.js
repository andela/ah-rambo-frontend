import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';
import {
  searchRequest,
  searchStartRequest,
  searchArticleRequest
} from './search';
import { SEARCH_REQUEST, SEARCH_SUCCESS, SEARCH_FAILURE } from '../../actionTypes';


describe('Custom search and filter action Test', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);
  let query, parameter, pageno;
  parameter= 'how to run test in enzyme';

  it('dispatch success search request Action function', async () => {
    const store = mockStore({});
    const expectedAction = [
      { type: 'SEARCH_REQUEST', searchParameter: 'how to run test in enzyme' },
      { type: 'SEARCH_SUCCESS', searchData: {} },
    ]

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 200, response: {} });
    });
    await store.dispatch(searchRequest(query, parameter, pageno));
    expect(store.getActions()).toEqual(expectedAction);
  });

  it('dispatch a failure action when a search request fails', async () => {
    const store = mockStore({});
    const expectedAction = [
      { type: 'SEARCH_REQUEST', searchParameter: 'how to run test in enzyme' },
      { type: 'SEARCH_FAILURE', searchError: {} },
    ]

    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({
        status: 401,
        response: {}
      });
    });

    await store.dispatch(searchRequest(query, parameter, pageno));
    expect(store.getActions()).toEqual(expectedAction);
  });
  });
