
import ArticleDescription from './ArticleDescription';

const props = {
  image:'',
  title:'',
  onSubmit: jest.fn(),
  onClick: jest.fn(),
  body: '',
  category: '',
  tag: 'hello',
  description: '',
  handleChange: jest.fn(() => jest.fn()),
  taglist: '',
  removeTag: jest.fn(),
  handleBlur: jest.fn(() => jest.fn()),
  handleFocus: jest.fn(() => jest.fn()),
  error: {a: ''},
  articleBody: 'greater',
  description: '',
  tagError: 'error',
  categoryError: 'error',
  descriptionError: 'error',
  disable: false,
  allTags: ['hi'],
  allCategories: [ 'Other', 'Arts & Entertainment'],

}

const propsWithImage = {
  ...props,
  image: "https://picsum.photos/200/300"
}

const wrapper = shallow(<ArticleDescription {...props} />);
let instance;

describe('Article Description Test', () => {
  it('Renders as expected', () => {    
    expect(wrapper.find('div').at(3).hasClass('article-card')).toBe(true);
    expect(wrapper.find('div').at(4).hasClass('image-input')).toBe(true);
    expect(wrapper.find('div').at(7).hasClass('article-body-preview')).toBe(true);
    expect(wrapper.find('div').last().hasClass('btn-wrapper')).toBe(true);
    expect(wrapper.find('select').exists()).toBe(true);
    expect(wrapper.find('textarea').exists()).toBe(true);
    expect(wrapper.find('img').first().hasClass('full-height')).toBe(false);
    expect(wrapper.find('img').first().hasClass('content-height')).toBe(true);
  });
  it('Handles mouse and keyboard events', () => {
    instance = shallow(<ArticleDescription {...props} />);
    instance.find('select#categories').simulate('change', {
      target:{
        value: 'Commerce'
      },
    })
    expect(props.handleChange).toHaveBeenCalled();

    wrapper.find('Input').dive().find('input#myTags').simulate('keypress', {
      key: 'Enter',
      preventDefault: jest.fn()
    })
    expect(props.handleChange).toHaveBeenCalled();

    instance = shallow(<ArticleDescription {...propsWithImage} />);
    instance.find('Input').dive().find('input#myTags').simulate('keypress', {
      key: 'h',
      preventDefault: jest.fn()
    })
    expect(props.handleChange).toHaveBeenCalled();
  });
  it('should disable button', () => {
    props.disable=true;
    const newWrapper = shallow(<ArticleDescription {...props} />);
    expect(newWrapper.find('div.btn-wrapper').first().text()).toBe('Loading');
  });

  it('should disable input', () => {
    props.taglist='cvhbj,dfgh,fdghj,fdghjk,fghjk,fdst,rfed,jyg,gdf,zew,opoi,fdsz,jhbhj,fesfhgkj,kjhkuhiuguyfty';
    const newWrapper = shallow(<ArticleDescription {...props} />);
    expect(newWrapper.find('Input').dive().find('input#myTags').text()).toBe('');
  });

  it('should renders options', () => {
    const newWrapper = shallow(<ArticleDescription {...props} />);
    expect(newWrapper.find('Options').last().dive().find('option').first().key()).toBe('Other');
  });
  
});

