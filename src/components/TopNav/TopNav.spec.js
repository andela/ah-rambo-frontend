import CheckPropTypes from 'check-prop-types';
import TopNav from './TopNav';

const setup = (propsOverride) => {
  const props = {
    user: {},
    ...propsOverride,
  };
  const wrapper = shallow(<TopNav {...props} />);
  return { wrapper, props };
};

describe('TopNav Component', () => {
  it('renders self without crashing', () => {
    const { wrapper } = setup();

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('nav')).toHaveLength(1);
    expect(wrapper.find('ul')).toHaveLength(1);
    expect(wrapper.find('li')).toHaveLength(2);
  });

  it('does not throw a warning with correct prop types', () => {
    const { props } = setup();
    const propsError = CheckPropTypes(
      TopNav.propTypes,
      props,
      'props',
      TopNav.name
    );

    expect(propsError).toBeUndefined();
  });
});
