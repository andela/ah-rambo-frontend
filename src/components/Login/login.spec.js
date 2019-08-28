import Login from './login';

describe('Login component ', () => {

  it('renders component successfully', () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find('div')).toHaveLength(1);
    });
  it('contains a div element', () => {
    const component = mount(<Login />);
    component.containsMatchingElement(<div>welcome to the login page</div>)
  });
});
