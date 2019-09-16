import FormatToolbar from './FormatToolbar';

const props = {
  children: <h1>Hi</h1>
};

const wrapper = shallow(<FormatToolbar {...props} />);

describe('FormatToolbar Test', () => {
  it('renders a div element', done => {
    expect(wrapper.exists()).toBe(true);
    expect(wrapper.length).toBe(1);
    done();
  });
  it('renders children with the div element', (done) => {
    expect(wrapper.find('h1').length).toBe(1);
    done()
  });
});
