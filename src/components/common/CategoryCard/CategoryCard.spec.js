import CategoryCard from './CategoryCard';

const wrapper = shallow(<CategoryCard />);

describe('Category Card tests', () => {
  it('returns the dom element', () => {
    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find('h2')).toHaveLength(1);
  });
});