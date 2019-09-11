import configureMockStore from 'redux-mock-store';
import moxios from 'moxios';
import thunk from 'redux-thunk';

import { postCommentAction, loadComments} from './postComment';



const slug = 'how-to-kill-a-dragon'
const data = {
"comment": {
"id": '311',
"comment": "This is a mock comment",
"articleId": 91,
"updatedAt": "2019-09-16T14:05:01.108Z",
createdAt: '2019-09-16T14:05:01.108Z',
"author": {
    "id": 64,
    "userName": "xwebyna",
    "bio": null,
    "avatarUrl": "https://res.cloudinary.com/teamrambo50/image/upload/v1565160704/avatar-1577909_1280_xsoxql.png",
    "following": false
}
}
}

const payload = {
  id: '311',
  comment: "This is a mock comment",
  userName:  "xwebyna",
  date: '2019-09-16T14:05:01.108Z',
  avatarUrl: "https://res.cloudinary.com/teamrambo50/image/upload/v1565160704/avatar-1577909_1280_xsoxql.png"
};

const commentBody = {
  comment: 'Mocking comment'
}

const error  = 'Please verify your account'



describe('Post Comment Actions Test', () => {
  beforeEach(() => {
    moxios.install();
  });

  afterEach(() => {
    moxios.uninstall();
  });

  const middleware = [thunk];
  const mockStore = configureMockStore(middleware);

  it('dispatches an action to load comments to the store', () => {
    const expectedAction = {
      type: 'LOAD_COMMENTS',
      payload
    }
    
    const action =  loadComments(payload)
    expect(action).toEqual(expectedAction);
  });

  it('dispatches a success action to post comment',async () => {
    const store = mockStore({});
   
    const expectedActions = [{type: "POST_COMMENT_SUCCESS", payload} ];
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 201, response: data });
    });
    await store.dispatch(postCommentAction(commentBody, slug));
    expect(store.getActions()).toEqual(expectedActions)
  });


  it('dispatches a failure action when comment posting fails',async () => {
    const store = mockStore({});
    const error = "Please verify your account"
    
   
    const expectedActions = [{type: "POST_COMMENTS_FAILURE", payload:error} ];
    moxios.wait(() => {
      const request = moxios.requests.mostRecent();
      request.respondWith({ status: 401, response: {
        error :"Please verify your account"
      } });
    });
    await store.dispatch(postCommentAction(commentBody, slug));
    expect(store.getActions()).toEqual(expectedActions)
  });
});
