import CheckPropTypes from 'check-prop-types';
import Input from './Input';

const setup = (propsOverride) => {
  const props = {
    type: '',
    value: '',
    name: '',
    placeholder: '',
    className: '',
    onChange: jest.fn(),
    error: '',
    ...propsOverride,
  };

  const wrapper = shallow(<Input {...props} />);
  return { props, wrapper };
};

describe('Input Component', () => {
  it('renders self without crashing', () => {
    const { wrapper } = setup();

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('input')).toHaveLength(1);
  });

  it('does not throw a warning with correct prop types', () => {
    const { props } = setup();
    const propsError = CheckPropTypes(
      Input.propTypes,
      props,
      'props',
      Input.name
    );

    expect(propsError).toBeUndefined();
  });
});
