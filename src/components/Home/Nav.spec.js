import Nav from './Nav';

const props = {
  TotalCategories: [{
    id: 1,
    name: 'Carton',
    link: '/carton'
  }, {
    id: 2,
    name: 'Carton',
    link: '/carton'
  }, {
    id: 3,
    name: 'Carton',
    link: '/carton'
  }]
};

const wrapper = shallow(<Nav TotalCategories={props.TotalCategories} />);

describe('Nav Test', () => {
  it('returns a nav element', () => {
    expect(wrapper.find('nav')).toHaveLength(1);
  });
  it('returns four li elements', () => {
    expect(wrapper.find('li')).toHaveLength(4);
  });
})
