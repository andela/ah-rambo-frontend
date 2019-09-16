import TagCards from './TagCards';

const props = (tags) => ({
  removeTag: jest.fn(),
  tags,
  disable: false
});

let wrapper = shallow(<TagCards {...props('hello,how,are,you')} />);

describe('TagCards Test', () => {
  it('renders a div element', done => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.length).toBe(1);
    done();
  });
  it('renders conditionally renders children with the div element', (done) => {
    wrapper = mount(<TagCards {...props('')} />);
    expect(wrapper.find('div.noDisplay').length).toBe(1);
    expect(wrapper.find('br.noDisplay').length).toBe(1);
    done()
  });
});
