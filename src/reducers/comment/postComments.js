import {
  POST_COMMENT_FAILURE,
  POST_COMMENT_SUCCESS,
  LOAD_COMMENTS
} from '../../actionTypes';

const initialState = {
  isLoading: false,
  comments: [],
  error: ''
};

export default (state = initialState, action) => {
  switch (action.type) {
    case POST_COMMENT_SUCCESS:
      return {
        ...state,
        comments: [action.payload, ...state.comments],
      };

    case LOAD_COMMENTS:
      return {
        ...state,
        comments: [...action.payload]
      };

    case POST_COMMENT_FAILURE:
      return {
        ...state,
        error: action.payload,
        isLoading: true
      };
    default:
      return state;
  }
};
