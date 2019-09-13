import VerticalArticleCard from './VerticalArticleCard';

const wrapper = shallow(<VerticalArticleCard />);

describe('Vertical Article Card tests', () => {
  it('returns the dom element', () => {
    expect(wrapper.find('figure')).toHaveLength(1);
    expect(wrapper.find('figcaption')).toHaveLength(1);
    expect(wrapper.find('span')).toHaveLength(2);
    expect(wrapper.find('h6')).toHaveLength(1);
  });
});