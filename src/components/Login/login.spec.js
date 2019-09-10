import { Login } from './login';
import { Input } from '../common';

const USER = {
  userLogin: 'userrrrrrr',
  password: 'passwordddd'
};

const setup = () => {
  const props = {
    error: {message: 'incorrect username or password' }, 
    login: jest.fn(),
    history: { push: jest.fn() }
  };

  const wrapper = shallow(<Login {...props} />);
  return { props, wrapper };
};

describe('Login Component Rendering', () => {
  it('renders without crashing', () => {
    const { wrapper } = setup();
    expect(wrapper.find('main').hasClass('Login')).toBe(true);
  });

  it('renders the login info section', () => {
    const { wrapper } = setup();
    expect(wrapper.find('.Login__info')).toHaveLength(1);
  });

  it('renders login form with inputs and button', () => {
    const { wrapper } = setup();
    const FormComponent = wrapper.find('Form');
    const button = wrapper.find('Button');


    expect(FormComponent).toHaveLength(1);
    expect(FormComponent.dive().find('Input')).toHaveLength(2);
    expect(FormComponent.dive().find('Button')).toHaveLength(1);
    expect(button.props().label).toEqual('Submit')

  });
});

describe('Login Component interaction', () => {
  it('updates its state when input fields change', () => {
    const { wrapper } = setup();
    const classInstance = wrapper.instance();
    const event = { target: { name: 'userLogin', value: 'John' } };
    const userLoginField = wrapper.find(Input).at(0)
    userLoginField.simulate('change', event);
    expect(classInstance.state.userLogin).toBe('John');
  });

  it('clears validation error message when an input is focused', () => {
    const { wrapper } = setup();
    const classInstance = wrapper.instance();
    const changeEvent = { target: { name: 'userLogin', value: '' } };
    const focusEvent = {
      preventDefault: jest.fn(),
      target: { name: 'userLogin' },
    };
    const userLoginField = wrapper.find(Input).at(0)
    userLoginField.simulate('change', changeEvent);
    classInstance.handleSubmit({ preventDefault: jest.fn() });
    classInstance.handleFocus(focusEvent);
    expect(classInstance.state.errors.userLogin).toBe('');
  });

  it('redirect user to dashboard page when login is successful', () => {
    const { wrapper, props } = setup();
    const Form = wrapper.find('Form');
    wrapper.setState({ userLogin: USER.userLogin});
    wrapper.setState({ password: USER.password});
    Form.simulate('submit', {preventDefault: jest.fn}); 
    expect(wrapper.state('userLogin')).toEqual(USER.userLogin);
    expect(wrapper.state('password')).toEqual(USER.password);
    expect(props.login).toHaveBeenCalled();
  });
});

describe('login Inputs Validation', () => {
  it('returns validation errors when userLogin input is less than 6 characters', () => {
    const { wrapper } = setup();
    const classInstance = wrapper.instance();
    const event = { target: { name: 'userLogin', value: 'bb' } };
    const userLoginField = wrapper.find(Input).at(0)
    userLoginField.simulate('change', event);
    classInstance.handleSubmit({ preventDefault: jest.fn() });
    expect(classInstance.state.errors.userLogin).toBeTruthy();
  });
});
