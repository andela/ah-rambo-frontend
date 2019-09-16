import {
  BoldMark,
  ItalicMark,
  UnderlineMark,
  CodeMark,
  OrderedListMark,
  UnorderedListMark
} from './ArticleTools';

const markProps = {
  children: ['Hello'],
  attributes: {}
};

let instance;
let res;
let wrapper;


describe('Actions Test', () => {
  it('renders an element when prop is pased in', () => {
    wrapper = shallow(<BoldMark {...markProps} />);

    expect(wrapper.find('strong').length).toBe(1);

    wrapper = shallow(<ItalicMark {...markProps} />);

    expect(wrapper.find('em').length).toBe(1);

    wrapper = shallow(<UnderlineMark {...markProps} />);

    expect(wrapper.find('u.underline').length).toBe(1);

    wrapper = shallow(<CodeMark {...markProps} />);
    expect(wrapper.find('code').length).toBe(1);

    wrapper = shallow(<OrderedListMark {...markProps} />);

    expect(wrapper.find('ol').length).toBe(1);

    wrapper = shallow(<UnorderedListMark {...markProps} />);

    expect(wrapper.find('ul').length).toBe(1);
  });
});
