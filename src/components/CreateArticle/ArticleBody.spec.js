import ArticleBody from './ArticleBody';

const props = {
  handleSubmit: jest.fn(),
  renderMarkButton: jest.fn(),
  renderBlockButton: jest.fn(),
  handleFileChange: jest.fn(),
  onMarkClick: jest.fn(() => jest.fn()),
  state: {
    image: "https://picsum.photos/200/300",
    title: '',
    body: '',
    imageError: 'error',
    titleError: 'error',
    articleBodyError: 'error'
  },
  editorRef: jest.fn(),
  removeImage: jest.fn(),
  handleChange: jest.fn(() => jest.fn()),
  handleBlur: jest.fn(() => jest.fn()),
  handleFocus: jest.fn(() => jest.fn()),
}


const wrapper = shallow(<ArticleBody {...props} />);
let instance;

describe('Article Body Test', () => {
  it('Renders as expected', () => {    
    expect(wrapper.find('Editor').exists()).toBe(true);
    expect(wrapper.find('FormatToolbar').exists()).toBe(true);
  });

  it('Handles mouse and keyboard events', () => {

    delete props.state.image;
    instance = shallow(<ArticleBody {...props} />);
    expect(wrapper.find('img').first().hasClass('fa')).toBe(true);
  });
});

