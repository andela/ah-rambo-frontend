import React from 'react';
import {ResetPassword} from './ResetPassword';

const resetPassword = jest.fn({});
const location =  {
  search: 'token'
} 

const shallowSetup=(error, message)=> {
  const props = {
    isLoading:false,
    error, 
    message,
    resetPassword,
    location
  };
  const enzymeWrapper = shallow(<ResetPassword {...props} />);

  return {
    props,
    enzymeWrapper
  };
}

describe('Reset Password Component Rendering', () => {
  it('renders without crashing', () => {
    const { enzymeWrapper } = shallowSetup()
    expect(enzymeWrapper.find('div').at(0).hasClass('main')).toBe(true);
  });

  it('renders the reset page info section', () => {
    const { enzymeWrapper } = shallowSetup()
    expect(enzymeWrapper.find('.reset__password__form')).toHaveLength(1);
  });

  it('renders reset password form with inputs and button', () => {
    const { enzymeWrapper } = shallowSetup()
    const FormComponent = enzymeWrapper.find('Form');
    const button = enzymeWrapper.find('Button');

    expect(FormComponent).toHaveLength(1);
    expect(FormComponent.dive().find('Input')).toHaveLength(2);
    expect(FormComponent.dive().find('Button')).toHaveLength(1);
    expect(button.props().label).toEqual('Submit')

  });
});


describe('Reset Password Component Functionality Tests', () => {

  it('updates the state calling handleChange function and call handleSubmit event', () => {
    const { enzymeWrapper, props} = shallowSetup();
    const {location: {search: token}} =  props
    const Form =  enzymeWrapper.find('Form')
    const classInstance = enzymeWrapper.instance();
    const passwordInputField = enzymeWrapper.find('Input').at(0);
    const confirmPasswordInputField = enzymeWrapper.find('Input').at(1);
    passwordInputField.simulate('change', {
      target: {
        value: 'teamramnbo',
        name: 'password'
      }
    })

    confirmPasswordInputField.simulate('change', {
      target: {
        value: 'teamramnbo',
        name: 'confirmPassword'
      }
    })
    classInstance.handleSubmit({preventDefault: jest.fn});
    expect(enzymeWrapper.state('password')).toEqual('teamramnbo');
    expect(enzymeWrapper.state('confirmPassword')).toEqual('teamramnbo');
  })

  it('updates the state with password validation errors when password input field is empty', () => {
    const { enzymeWrapper } = shallowSetup();
    const classInstance = enzymeWrapper.instance();
    classInstance.validateInput({
      preventDefault: jest.fn(),
      target: { name: 'password' },
    })
    classInstance.handleSubmit({preventDefault: jest.fn});
    expect(classInstance.state.passwordError).toEqual("password is required");
  })


  it('updates the state with passowrd validation errors when password provided is invalid', () => {
    const { enzymeWrapper } = shallowSetup();
    const classInstance = enzymeWrapper.instance();
    const passwordInputField = enzymeWrapper.find('Input').at(0);
    passwordInputField.simulate('change', {
      target: {
        value: 'email',
        name: 'password'
      }
    })
  
    classInstance.handleSubmit({preventDefault: jest.fn});
    expect(classInstance.state.passwordError).toEqual("password should not be less than 8 characters");
    expect(classInstance.state.confirmPasswordError).toEqual("confirm password is required");
  })


  it('updates the state with passowrd validation errors when password provided is has whitespaces', () => {
    const { enzymeWrapper } = shallowSetup();
    const classInstance = enzymeWrapper.instance();
    const passwordInputField = enzymeWrapper.find('Input').at(0);
    passwordInputField.simulate('change', {
      target: {
        value: 'email   gmail',
        name: 'password'
      }
    })
  
    classInstance.handleSubmit({preventDefault: jest.fn});
    expect(classInstance.state.passwordError).toEqual("password should not contain spaces");
  })

  it('clears error when an input is focused', () => {
    const { enzymeWrapper } = shallowSetup();
    const classInstance = enzymeWrapper.instance();
    const Form = enzymeWrapper.find('Form');
    const passwordInputField = enzymeWrapper.find('Input').at(0);
    passwordInputField.simulate('change', {
      target: {
        value: 'teamgmailcom',
        name: 'password'
      }
    })
    Form.simulate('submit', {preventDefault: jest.fn});
    classInstance.handleFocus({
      preventDefault: jest.fn(),
      target: { name:  'password'},
    })
    expect(classInstance.state.passwordError).toEqual('')
  })

  it('renders error when link has been used or expired', () => {
    const { enzymeWrapper, props } = shallowSetup('link has been used or expired', 'Password reset successfully');
    const classInstance = enzymeWrapper.instance();

    classInstance.setState({response:{error: props.error}})
    classInstance.handleSubmit({
      preventDefault: jest.fn(),
    })
    expect(classInstance.props.error).toEqual(classInstance.state.response.error)
  })


  it('renders success message when password reset is successful', () => {
    const { enzymeWrapper, props } = shallowSetup('link has been used or expired', 'Password reset successfully');
    const classInstance = enzymeWrapper.instance();
    classInstance.setState({response:{message: props.message}})
    classInstance.handleSubmit({
      preventDefault: jest.fn(),
    })

    expect(classInstance.props.message).toEqual(classInstance.state.response.message)
  })
});
