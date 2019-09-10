import CheckPropTypes from 'check-prop-types';
import Button from './Button';

const setup = (propsOverride) => {
  const props = {
    className: '',
    title: '',
    disabled: false,
    name: '',
    label: 'Submit',
    onClick: jest.fn(),
    ...propsOverride,
  };

  const wrapper = shallow(<Button {...props} />);
  return { props, wrapper };
};

describe('Button Component', () => {
  it('renders self without crashing', () => {
    const { wrapper } = setup({ label: 'Hello' });

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('button')).toHaveLength(1);
    expect(wrapper.text()).toBe('Hello');
  });

  it('does not throw a warning with correct prop types', () => {
    const { props } = setup();
    const propsError = CheckPropTypes(
      Button.propTypes,
      props,
      'props',
      Button.name
    );

    expect(propsError).toBeUndefined();
  });
});
