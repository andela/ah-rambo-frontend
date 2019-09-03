import CheckPropTypes from 'check-prop-types';
import { Signup } from './Signup';
import Form from '../Form/Form';
import Input from '../Input/Input';
import Button from '../Button/Button';

const MOCK_USER = {
  firstName: 'John',
  lastName: 'Doe',
  userName: 'john101',
  email: 'john@doe.com',
  password: 'john@doe.com',
  confirmPassword: 'john@doe.com',
};

const setup = (propsOverride) => {
  const props = {
    signupStatus: {},
    signupUser: jest.fn(),
    history: { push: jest.fn() },
    ...propsOverride,
  };

  const wrapper = shallow(<Signup {...props} />);
  return { props, wrapper };
};

describe('Signup Component Rendering', () => {
  it('renders without crashing', () => {
    const { wrapper } = setup();
    expect(wrapper.find('main').hasClass('Signup')).toBe(true);
  });

  it('renders the signup info section', () => {
    const { wrapper } = setup();
    expect(wrapper.find('.Signup__info')).toHaveLength(1);
  });

  it('renders signup form with inputs and button', () => {
    const { wrapper } = setup();
    const FormComponent = wrapper.find('Form');

    expect(FormComponent).toHaveLength(1);
    expect(FormComponent.dive().find('Input')).toHaveLength(6);
    expect(FormComponent.dive().find('Button')).toHaveLength(1);
  });

  it('does not throw warning when prop types are valid', () => {
    const { props: expectedProps } = setup();
    const propsError = CheckPropTypes(
      Signup.propTypes,
      expectedProps,
      'props',
      Signup.name
    );
    expect(propsError).toBeUndefined();
  });
});

describe('Signup Component Interactivity', () => {
  it('renders signup error from backend', () => {
    const { wrapper, props } = setup({
      signupStatus: { status: 'failed', reason: 'email has been taken' },
    });
    const classInstance = wrapper.instance();
    const stateClone = { ...classInstance.state };

    stateClone.errors.signup = props.signupStatus.reason;
    stateClone.data = { ...MOCK_USER };
    wrapper.setState({ data: stateClone.data });
    classInstance.setState({ errors: stateClone.errors });

    classInstance.handleSubmit({ preventDefault: jest.fn() });
    expect(classInstance.props).toBeTruthy();
  });

  it('updates its state when input fields change', () => {
    const { wrapper } = setup();
    const classInstance = wrapper.instance();
    const event = { target: { name: 'firstName', value: 'John' } };
    const firstNameField = wrapper
      .find(Input)
      .at(0)
      .dive()
      .find('input[name="firstName"]');

    firstNameField.simulate('change', event);
    expect(classInstance.state.data.firstName).toBe('John');
  });

  it('clears validation error message when an input is focused', () => {
    const { wrapper } = setup();
    const classInstance = wrapper.instance();
    const changeEvent = { target: { name: 'firstName', value: '' } };
    const focusEvent = {
      preventDefault: jest.fn(),
      target: { name: 'firstName' },
    };
    const firstNameField = wrapper
      .find(Input)
      .at(0)
      .dive()
      .find('input[name="firstName"]');

    firstNameField.simulate('change', changeEvent);
    classInstance.handleSubmit({ preventDefault: jest.fn() });
    classInstance.clearErrorMessages(focusEvent);

    expect(classInstance.state.errors.firstName).toBe('');
  });

  it('redirect user to profile page when signup request is successful', () => {
    const { wrapper, props } = setup({ signupStatus: { status: 'completed' } });
    wrapper.setState({ data: MOCK_USER });
    wrapper
      .find('Form')
      .dive()
      .find('form')
      .simulate('submit', { preventDefault: jest.fn() });

    expect(props.signupUser).toHaveBeenCalled();
  });
});

describe('Signup Inputs Validation', () => {
  it('returns validation errors when first name is missing', () => {
    const { wrapper } = setup();
    const classInstance = wrapper.instance();
    const event = { target: { name: 'firstName', value: '' } };
    const firstNameField = wrapper
      .find(Input)
      .at(0)
      .dive()
      .find('input[name="firstName"]');

    firstNameField.simulate('change', event);
    classInstance.handleSubmit({ preventDefault: jest.fn() });
    expect(classInstance.state.errors.firstName).toBeTruthy();
  });

  it('returns validation errors when first name is less than 2 chars', () => {
    const { wrapper } = setup();
    const classInstance = wrapper.instance();
    const event = { target: { name: 'firstName', value: 'a' } };
    const firstNameField = wrapper
      .find(Input)
      .at(0)
      .dive()
      .find('input[name="firstName"]');

    firstNameField.simulate('change', event);
    classInstance.handleSubmit({ preventDefault: jest.fn() });
    expect(classInstance.state.errors.firstName).toBeTruthy();
  });

  it('returns validation errors when first name is more than 50 chars', () => {
    const { wrapper } = setup();
    const classInstance = wrapper.instance();
    const event = {
      target: { name: 'firstName', value: new Array(20).join('abc') },
    };
    const firstNameField = wrapper
      .find(Input)
      .at(0)
      .dive()
      .find('input[name="firstName"]');

    firstNameField.simulate('change', event);
    classInstance.handleSubmit({ preventDefault: jest.fn() });
    expect(classInstance.state.errors.firstName).toBeTruthy();
  });

  it('returns validation errors when email is not valid', () => {
    const { wrapper } = setup();
    const classInstance = wrapper.instance();
    const event = { target: { name: 'email', value: 'aab' } };
    const emailField = wrapper
      .find(Input)
      .at(3)
      .dive()
      .find('input[name="email"]');

    emailField.simulate('change', event);
    classInstance.handleSubmit({ preventDefault: jest.fn() });
    expect(classInstance.state.errors.email).toBeTruthy();
  });

  it('returns validation errors when password contains spaces', () => {
    const { wrapper } = setup();
    const classInstance = wrapper.instance();
    const event = { target: { name: 'password', value: 'a thorshaven' } };
    const passwordField = wrapper
      .find(Input)
      .at(4)
      .dive()
      .find('input[name="password"]');

    passwordField.simulate('change', event);
    classInstance.handleSubmit({ preventDefault: jest.fn() });
    expect(classInstance.state.errors.password).toBeTruthy();
  });

  it('returns validation errors when passwords do not match', () => {
    const { wrapper } = setup();
    const classInstance = wrapper.instance();
    const event = { target: { name: 'confirmPassword', value: 'ahorshaven' } };
    const confirmPassword = wrapper
      .find(Input)
      .at(5)
      .dive()
      .find('input[name="confirmPassword"]');

    confirmPassword.simulate('change', event);
    classInstance.handleSubmit({ preventDefault: jest.fn() });
    expect(classInstance.state.errors.confirmPassword).toBeTruthy();
  });
});
