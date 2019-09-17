import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { Search } from './Search';
import SearchComponent from './Search';


const createStore = (searchResponse = {}, searchLoading= false, searchError=null, searchParameter='search', articleSearchStatus=true ) => {
  const content = {
search: {
  searchResponse,
  searchLoading,
  searchError,
  searchParameter,
  articleSearchStatus
}
  };
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const store = mockStore({
    search: { ...content.search, searchResponse, searchLoading, searchError, searchParameter, articleSearchStatus }
  });
  return store;
};

const props = {
  searchResponse: {
    currentPage: 1,
    totalPages: 3,
    itemsOnPage: 3,
    data: {
      count: 10,
      results: []
  }
},
  searchLoading: false,
  searchError: null,
  searchParameter: 'parameter',
  articleSearchStatus: false,
  searchRequest: jest.fn(),
  searchArticleRequest: jest.fn()
}
describe('Search Component Test', () => {
  it ('renders the component successfully', () => {
    const wrapper = mount(
      <Provider store={createStore({}, false, null, 'search', false)}>
          <Router>
          <SearchComponent {...props}/>
          </Router>
      </Provider>
    );
    expect(wrapper).toBeDefined();
  });
})
