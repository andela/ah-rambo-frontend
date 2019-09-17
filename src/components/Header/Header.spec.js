import CheckPropTypes from 'check-prop-types';
import moxios from 'moxios';
import { Header } from './Header';


const setup = (propsOverride) => {
  const props = {
    user: null,
    getUserDetails: jest.fn(),
    deAuthUser: jest.fn(),
    isAuthenticated: true,
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

  describe('Header component render test', () => {
    it('authenticate user', () => {
      const props = {
        user: null,
        getUserDetails: jest.fn(),
        deAuthUser: jest.fn(),
        isAuthenticated: false,
        getUserDetails: jest.fn()
      };
      const prevProps = {
        user: null,
        getUserDetails: jest.fn(),
        deAuthUser: jest.fn(),
        isAuthenticated: true,
      };

      let wrapper = shallow(<Header {...props} />);
      const classInstance = wrapper.instance();
      classInstance.componentDidUpdate(prevProps);
      expect(wrapper.find('Header__logo')).toBeTruthy();
      expect(props.getUserDetails).toHaveBeenCalled();
    });
  });
});
