import HorizontalVerticalCards from './HorizontalVerticalCards';

const wrapper = shallow(<HorizontalVerticalCards />);

describe('Horizontal Vertical Cards tests', () => {
  it('returns the dom element', () => {
    expect(wrapper.find('figure')).toHaveLength(1);
    expect(wrapper.find('figcaption')).toHaveLength(1);
    expect(wrapper.find('span')).toHaveLength(2);
    expect(wrapper.find('h6')).toHaveLength(1);
  });
});