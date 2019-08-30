import NotFound from './Notfound';

describe('NotFound component test', () => {

  it('renders component successfully', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.find('div')).toHaveLength(1);
    });
  it('contains a div element', () => {
    const component = mount(<NotFound />);
    component.containsMatchingElement(<div>404 page not found</div>)
  });
});
