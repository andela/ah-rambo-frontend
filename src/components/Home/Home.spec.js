import Home from './Home';
import { exportAllDeclaration } from '@babel/types';

describe('Home component test', () => {
  it('renders component successfully', () => {
  const wrapper = shallow(<Home />);
  expect(wrapper.find('div')).toHaveLength(2);
  });
  it('contains a div element', () => {
    const component = mount(<Home />);
    component.containsMatchingElement(<div>welcome to the Home page</div>)
  });
});
