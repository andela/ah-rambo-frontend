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

  it('does not render an error below when it does not recieve error prop', () => {
    const { wrapper } = setup();

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('.input-validation-error')).toHaveLength(0);
  });

  it('renders an error below when it recieves error props', () => {
    const { wrapper } = setup({ error: 'first name is required' });

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('.input-validation-error')).toHaveLength(1);
    expect(wrapper.find('.input-validation-error').text()).toBe(
      'first name is required'
    );
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
