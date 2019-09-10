import CheckPropTypes from 'check-prop-types';
import Form from './Form';

const setup = (propsOverride) => {
  const props = {
    className: '',
    children: new Array(),
    onSubmit: jest.fn(),
    ...propsOverride,
  };

  const wrapper = shallow(<Form {...props}>children</Form>);
  return { props, wrapper };
};

describe('Form Component', () => {
  it('renders self without crashing', () => {
    const { wrapper } = setup();

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('form')).toHaveLength(1);
  });

  it('does not throw a warning with correct prop types', () => {
    const { props } = setup();
    const propsError = CheckPropTypes(
      Form.propTypes,
      props,
      'props',
      Form.name
    );

    expect(propsError).toBeUndefined();
  });
});
