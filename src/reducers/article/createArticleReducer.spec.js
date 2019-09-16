import * as createArticleActionType from '../../actionTypes';
import createArticleReducer from './createArticleReducer';

const initialState = {
  allTags: ['...'],
  allCategories: ['...'],
  isLoading: false,
  data: null,
  error: null
};

describe('Create Article Reducer Test', () => {
  it('returns the initial state when no action is passed in', () => {
    expect(createArticleReducer(undefined, {type:''})).toEqual(initialState);
  });
  it('updates the data when a success action is dispatched', () => {
    const action = { data:'You are a liar', type: createArticleActionType.CREATE_ARTICLE_SUCCESS };
    const expectedState = {
      ...initialState,
      data: action.data
    };
    const wrongState = {
      ...initialState,
      error: action.data
    };
    expect(createArticleReducer(initialState, action)).toEqual(expectedState);
    expect(createArticleReducer(initialState, action)).not.toEqual(wrongState);
  });
  it('updates the error when a failure action is dispatched', () => {
    const action = { errors:'You are a liar', type: createArticleActionType.CREATE_ARTICLE_FAILURE };
    const wrongState = {
      ...initialState,
      data: action.errors
    };
    const expectedState = {
      ...initialState,
      error: action.errors
    };
    expect(createArticleReducer(initialState, action)).toEqual(expectedState);
    expect(createArticleReducer(initialState, action)).not.toEqual(wrongState);
  });
  it('updates the loading state when dispatched', () => {
    const action = { type: createArticleActionType.CREATE_ARTICLE_REQUEST };
    const wrongState = {
      ...initialState,
      data: action.type,
      error: action.error
    };
    const expectedState = {
      ...initialState,
      isLoading: true,
    };
    expect(createArticleReducer(initialState, action)).toEqual(expectedState);
    expect(createArticleReducer(initialState, action)).not.toEqual(wrongState);
  });
  it('updates the allTags state when dispatched', () => {
    const action = { type: createArticleActionType.GET_TAG, data: ['science', 'art'] };
    const wrongState = {
      ...initialState,
      data: action.type,
      error: action.data
    };
    const expectedState = {
      ...initialState,
      allTags: action.data,
    };
    expect(createArticleReducer(initialState, action)).toEqual(expectedState);
    expect(createArticleReducer(initialState, action)).not.toEqual(wrongState);
  });
  it('updates the allCategories state when dispatched', () => {
    const action = { type: createArticleActionType.GET_CATEGORY, data: ['Science', 'Art'] };
    const wrongState = {
      ...initialState,
      data: action.type,
      error: action.data
    };
    const expectedState = {
      ...initialState,
      allCategories: action.data,
    };
    expect(createArticleReducer(initialState, action)).toEqual(expectedState);
    expect(createArticleReducer(initialState, action)).not.toEqual(wrongState);
  });
});
