import sinon from 'sinon';
import Home from './Home';

describe('Home component test', () => {
  const url = '/?token=weHackedIt&username=odogwuRambo';
  beforeEach(() => history.replaceState({}, 'Home', url));

  it('renders component successfully', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find('div')).toHaveLength(1);
  });
  it('contains a div element', () => {
    const component = mount(<Home />);
    component.containsMatchingElement(<div>welcome to the Home page</div>);
  });

  it('mounts Home component and gets correct redirect url and token', () => {
    const component = shallow(<Home />);
    const queryParams = new URLSearchParams(window.location.search);
    expect(component.find('div')).toHaveLength(1);
    expect(component.find('p')).toHaveLength(1);
    expect(window.location.search).toEqual('?token=weHackedIt&username=odogwuRambo');
    expect(queryParams.get('token')).toEqual('weHackedIt');
    expect(queryParams.get('username')).toEqual('odogwuRambo');
  });
});
