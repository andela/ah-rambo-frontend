import Footer from './Footer';

const wrapper = mount(<Footer />);

describe('Footer tests', () => {
  it('returns the footer element', () => {
    expect(wrapper.find('footer')).toHaveLength(1);
  });

  it('returns div elements', () => {
    expect(wrapper.find('div')).toHaveLength(3);
  });

  it('returns the figure element', () => {
    expect(wrapper.find('figure')).toHaveLength(2);
  });

  it('returns the correct element text', () => {
    wrapper.containsMatchingElement(<p>CONTACT US</p>);
    wrapper.containsMatchingElement(<p>authorshaven@gmail.com</p>);
    wrapper.containsMatchingElement(<p>&copy; 2019 Authors Haven</p>);
    wrapper.containsMatchingElement(<p>Follow Us</p>);
  });
});
