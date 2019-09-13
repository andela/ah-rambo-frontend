import React from 'react';
import {RequestPassword} from './RequestPassword';

const requestPassword=  jest.fn();
const shallowSetup=(error, message)=> {
  const props = {
    isLoading:Boolean,
    error, 
    message,
    requestPassword
  };
  const enzymeWrapper = shallow(<RequestPassword {...props} />);

  return {
    props,
    enzymeWrapper
  };
}



describe('Request Password Component Functionality Tests', () => {

  it('updates the state calling handleChange function and call handleSubmit event', () => {
    const { enzymeWrapper} = shallowSetup();
    const classInstance = enzymeWrapper.instance();
    const emailInputField = enzymeWrapper.find('Input').at(0);
    emailInputField.simulate('change', {
      target: {
        value: 'team@gmail.com',
        name: 'email'
      }
    })
    classInstance.handleSubmit({preventDefault: jest.fn});
    expect(enzymeWrapper.state('email')).toEqual('team@gmail.com');
    expect(requestPassword).toBeCalledWith('team@gmail.com');
  })

  it('updates the state with email validation errors when input is empty', () => {
    const { enzymeWrapper } = shallowSetup();
    const classInstance = enzymeWrapper.instance();
    classInstance.validateInput({
      preventDefault: jest.fn(),
      target: { name: 'email' },
    })
    classInstance.handleSubmit({preventDefault: jest.fn});
    expect(classInstance.state.emailError).toEqual('email is required');
  })


  it('updates the state with email validation errors when email provided is invalid', () => {
    const { enzymeWrapper } = shallowSetup();
    const classInstance = enzymeWrapper.instance();
    const Form = enzymeWrapper.find('Form');
    const emailInputField = enzymeWrapper.find('Input').at(0);
    emailInputField.simulate('change', {
      target: {
        value: 'teamgmail.com',
        name: 'email'
      }
    })
        classInstance.validateInput({
      preventDefault: jest.fn(),
      target: { name: 'email' },
    })
    classInstance.handleSubmit({preventDefault: jest.fn});
    expect(classInstance.state.emailError).toEqual('email is invalid');
  })

  it('clears error when an input is focused', () => {
    const { enzymeWrapper } = shallowSetup();
    const classInstance = enzymeWrapper.instance();
    const Form = enzymeWrapper.find('Form');
    const emailInputField = enzymeWrapper.find('Input').at(0);
    emailInputField.simulate('change', {
      target: {
        value: 'teamgmail.com',
        name: 'email'
      }
    })
    Form.simulate('submit', {preventDefault: jest.fn});
    classInstance.handleFocus({
      preventDefault: jest.fn(),
      target: { name: 'email' },
    })
    expect(classInstance.state.emailError).toEqual('')
  })

  it('renders error when email is not found', () => {
    const { enzymeWrapper, props } = shallowSetup('email not found', 'Password link sent');
    const classInstance = enzymeWrapper.instance();

    classInstance.setState({response:{error: props.error}})
    classInstance.handleSubmit({
      preventDefault: jest.fn(),
    })

    expect(classInstance.props.error).toEqual(classInstance.state.response.error)
  })


  it('renders success message when reset link is sent', () => {
    const { enzymeWrapper, props } = shallowSetup('email not found', 'Password link sent');
    const classInstance = enzymeWrapper.instance();

    classInstance.setState({response:{message: props.message}})
    classInstance.handleSubmit({
      preventDefault: jest.fn(),
    })

    expect(classInstance.props.message).toEqual(classInstance.state.response.message)
  })
});
