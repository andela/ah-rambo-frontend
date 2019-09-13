import CheckPropTypes from 'check-prop-types';
import moxios from 'moxios';
import getUserDetails from '../../actions/user/getUserDetails';
import { Header } from './Header';
import TopNav from '../TopNav/TopNav';
import SearchForm from '../SearchForm/SearchForm';

const setup = (propsOverride) => {
  const props = {
    user: null,
    getUserDetails: jest.fn(),
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
});
