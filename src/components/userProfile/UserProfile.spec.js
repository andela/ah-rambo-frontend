import React from 'react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { BrowserRouter as Router } from 'react-router-dom'
import UserProfile from './UserProfile';

const initialState = {
  userData: {},
  userLoading: false,
  userError: null,
  articleError: null,
  userArticle: {
    total: 0,
    data: []
  },
  userArticleLoading: false
};

const article = {
  articleError: null,
  articleData: {total: 0, data: []},
  articleLoading: false
};
const user = {
  userData: {},
  userLoading: false,
  userError: null
};
const createStore = ( article, user) => {
  const content = {
    user: {
      userData: {},
      userLoading: false,
      userError: null,
    },
    article: {
      articleError: null,
      articleData: {},
      articleLoading: false
    }
  };
  const middlewares = [thunk];
  const mockStore = configureStore(middlewares);
  const store = mockStore({
    user: { ...content.user, ...user },
    article: {...content.article, ...article }
  });
  return store;
};

const props = {
  userData: {},
  userLoading: false,
  userError: null,
  articleError: null,
  articleData: {},
  history: { push: jest.fn() },
  articleLoading: false
}


describe('User Profile Component Test', () => {
  it ('renders the component successfully', () => {

    const wrapper = mount(
      <Provider store={createStore()}>
        <Router>
          <UserProfile {...props}/>
        </Router>
      </Provider>
    );
    expect(wrapper).toBeDefined();
  });

  it('renders and display spinner component', () => {
const props = {
  userData: {},
  userLoading: true,
  userError: {error: 'invalid user'},
  articleError: null,
  articleData: {},
  history: { push: jest.fn() },
  articleLoading: true
}
const article = {
  articleError: null,
  articleData: {total: 0, data: []},
  articleLoading: true
};
const user = {
  userData: {},
  userLoading: true,
  userError: null,
};
    const wrapper = mount(

      <Provider store={createStore(article, user)}>
        <Router>
          <UserProfile {...props}/>
        </Router>
      </Provider>
    );
    expect(wrapper.find('div')).toHaveLength(14);
  });

  it('fails to render when user does not exist', () => {
    const article = {
      articleError: null,
      articleData: {total: 0, data: []},
      articleLoading: false
    };
    const user = {
      userData: {},
      userLoading: false,
      userError: {error: 'invalid user'},
    };
    const props = {
      userData: {},
      userDataLoading: false,
      userError: {
        error: 'invalid user'
      },
      history: {
        push: jest.fn()
      },
      articleError: null,
      userArticle: {},
      userArticleLoading: false
    }
    const wrapper = mount(
      <Provider store={createStore(article, user)}>
        <Router>
          <UserProfile {...props}/>
        </Router>
      </Provider>
    );
    expect(props.history.push).toHaveBeenCalled();
  });


  it('fails to return article when session expired', () => {
    const article = {
      articleError: {
        message: 'session expired'
      },
      articleData: undefined,
      articleLoading: false
    };
    const user = {
      userData: {},
      userLoading: false,
      userError: null,
    };
    const props = {
      userData: {},
      userDataLoading: false,
      userError: null,
      history: {
        push: jest.fn()
      },
      articleError: {
        message: 'session expired'
      },
      userArticle: {},
      userArticleLoading: false
    }
    const wrapper = mount(
      <Provider store={createStore(article, user)}>
        <Router>
          <UserProfile {...props}/>
        </Router>
      </Provider>
    );
    expect(props.history.push).toHaveBeenCalled();
  });

  it('fails to return article when session expired', () => {
    const article = {
      articleError: null,
      articleData: undefined,
      articleLoading: false
    };
    const user = {
      userData: {
        firstName: 'Deborah',
      },
      userLoading: false,
      userError: null,
    };
    const props = {
      userData: {
        firstName: 'Deborah',
        lastName: 'Oke',
      },
      userDataLoading: false,
      userError: null,
      history: {
        push: jest.fn()
      },
      articleError: null,
      userArticleLoading: false
    }
    const wrapper = mount(
      <Provider store={createStore(article, user)}>
        <Router>
          <UserProfile {...props}/>
        </Router>
      </Provider>
    );
    expect(wrapper.find('main')).toHaveLength(1);

  });
});

