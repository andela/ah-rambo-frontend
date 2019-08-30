import * as validationActions from '../actions/validate';
import validate from './validate';

const validateUser = (user) => {
  if (Object.entries(user).length < 1) return 'Please fill all required fields';
};

const VALIDATE_USER = (userInformation) => {
  const error = validateUser(userInformation);
  return error ? validationActions.ACTION_FAILURE(error)
    : validationActions.ACTION_SUCCESS();
};

const state = {
  userIsLoading: false,
  isValid: false,
  error: null
};

describe('Validation Test', () => {
  describe('when no action is sent', () => {
    const expectedState = {
      ...state,
      isValid: null,
      userIsLoading: null
    };
    it('returns initial state', () => {
      expect(validate(undefined, '')).toEqual(expectedState);
    });
  });
  describe('when an empty user object is sent', () => {
    const expectedState = {
      ...state,
      error: 'Please fill all required fields'
    };
    it('returns error', () => {
      expect(validate(undefined, VALIDATE_USER({}))).toEqual(expectedState);
    });
  });
  describe('when a user object is sent', () => {
    const expectedState = {
      ...state,
      isValid: true,
    };
    it('returns success', () => {
      expect(validate(undefined, VALIDATE_USER({ name: 'ade' })))
        .toEqual(expectedState);
    });
  });
  describe('when a request is ongoing', () => {
    const expectedState = {
      ...state,
      userIsLoading: true,
    };
    it('returns a loading state', () => {
      expect(validate(undefined, validationActions.ACTION_REQUEST()))
        .toEqual(expectedState);
    });
  });
});
