import ReduxThunk from 'redux-thunk';
import configureStore from 'redux-mock-store';
import { Link } from 'react-router-dom';
import CheckPropTypes from 'check-prop-types';
import moxios from 'moxios';
import getUserProfile from '../../actions/user/getUserProfile';
import { Header } from './Header';
import TopNav from '../TopNav/TopNav';
import SearchForm from '../SearchForm/SearchForm';
import { GET_USER_PROFILE } from '../../actionTypes';

const setup = (propsOverride) => {
  const props = {
    user: null,
    getUserProfile: jest.fn(),
    ...propsOverride,
  };

  const wrapper = shallow(<Header {...props} />);
  return { props, wrapper };
};

describe('Header Component', () => {
  describe('Rendering', () => {
    it('renders without crashing', () => {
      const { wrapper } = setup();

      expect(wrapper.exists()).toBeTruthy();
      expect(wrapper.find('.Header')).toHaveLength(1);
    });

    it('renders app logo, search form, and nav element', () => {
      const { wrapper } = setup();

      expect(wrapper.find('Header__logo')).toBeTruthy();
      expect(wrapper.find('SearchForm')).toHaveLength(1);
      expect(wrapper.find('TopNav')).toHaveLength(1);
    });
  });

  describe('Prop Types Validation', () => {
    it('does not throw warning when props types are valid', () => {
      const { props } = setup();
      const propsError = CheckPropTypes(
        Header.propTypes,
        props,
        'props',
        Header.name
      );

      expect(propsError).toBeUndefined();
    });
  });

  describe('Interaction with Redux Store', () => {
    beforeEach(() => {
      moxios.install();
    });

    afterEach(() => {
      moxios.uninstall();
    });

    const middleware = [ReduxThunk];
    const mockStore = configureStore(middleware);

    it('dispatch getUserProfile function when it mounts', () => {
      const store = mockStore({});
      const expectedState = {
        firstName: 'John',
        lastName: 'Doe',
      };

      moxios.wait(() => {
        const request = moxios.requests.mostRecent();

        request.respondWith({
          status: 200,
          response: expectedState,
        });
      });

      return store.dispatch(getUserProfile()).then(() => {
        const actions = store.getActions();
        expect(actions[0].type).toBe(GET_USER_PROFILE);
      });
    });
  });
});
