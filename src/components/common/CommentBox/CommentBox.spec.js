import CheckPropTypes from 'check-prop-types';
import CommentBox from './CommentBox';


const setup = (propsOverride) => {
  const props = {
    commentBody: {},
    handleChange:jest.fn(),
    className:"", 
    editorRef:jest.fn(),
    placeholder:"",
    handleKeyDown:jest.fn(),
    spellCheck: true,
    authenticatedUserAvatar:"",
    ...propsOverride,
  }
  const wrapper = shallow(<CommentBox {...props}/>);
  return { props, wrapper };
}


describe('Comment Box Component Rendering Test', () => {
  it('renders without crashing', () => {
    const { wrapper } = setup();

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('img')).toHaveLength(1);
    expect(wrapper.find('.comment-container')).toHaveLength(1);
    expect(wrapper.find('Editor')).toHaveLength(1);
  })


  it('does not throw a warning with correct prop types', () => {
    const { props } = setup();
    const propsError = CheckPropTypes(
      CommentBox.propTypes,
      props,
      'props',
      CommentBox.name
    );

    expect(propsError).toBeUndefined();
  });
})