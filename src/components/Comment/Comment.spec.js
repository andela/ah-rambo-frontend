import CheckPropTypes from 'check-prop-types';
import {Comment} from './Comment';
import Plain from 'slate-plain-serializer';


// const store={
//   getState: jest.fn(() => ({
//     postComment: jest.fn(),
//     readArticle: {article: {comments: [{
//       id: 1,
//       userName: 'teamRambo',
//       comment: 'Just a comment',
//       date: '20-10-109',
//       avatarUrl: 'http://pic.com'
//     }]}}
//   }))
// }
// const event = new KeyboardEvent('keydown', {key: 'enter'});

const event = {
  target: {
    value: {}
  },
  preventDefault: jest.fn(),
  nativeEvent: jest.fn()
}

const commentData = [{
    id: 1,
    userName: 'teamRambo',
    comment: 'Just a comment',
    date: '20-10-109',
    avatarUrl: 'http://pic.com'
  },
  {
    id: 2,
    userName: 'teamRambo',
    comment: 'Just another comment',
    date: '20-10-109',
    avatarUrl: 'http://pic.com'
  },
  {
    id: 3,
    userName: 'teamRambo',
    comment: 'Just a comment',
    date: '20-10-109',
    avatarUrl: 'http://pic.com'
  },
  {
    id: 4,
    userName: 'teamRambo',
    comment: 'Just another comment',
    date: '20-10-109',
    avatarUrl: 'http://pic.com'
  },
  {
    id: 5,
    userName: 'teamRambo',
    comment: 'Just a comment',
    date: '20-10-109',
    avatarUrl: 'http://pic.com'
  },
  {
    id: 6,
    userName: 'teamRambo',
    comment: 'Just another comment',
    date: '20-10-109',
    avatarUrl: 'http://pic.com'
  }];

const setup = (propsOverride) => {
  const props = {
    loadComments: jest.fn(),
    postComment: jest.fn(),
    slug: '',
    commentData: { comments: [...commentData]},
    article: {},
  ...propsOverride,
  }

  const wrapper = shallow(<Comment {...props}/>);
  return { props, wrapper };
}

describe('Comment Component Test', () => {
  it('mounts the componnt and renders the DOM elements successfully', () => {
    const {wrapper} = setup();
    expect(wrapper.find('.comment-section')).toHaveLength(1);
    expect(wrapper.find('.comment__info__text')).toHaveLength(1);
    expect(wrapper.find('CommentBox')).toHaveLength(1);
    expect(wrapper.find('CommentCard')).toHaveLength(commentData.length - 1);
  })
})


describe('Reset Password Component Functionality Tests', () => {
  // it('updates the comment body in the state by calling handleChange function', async() => {
  //   delete event.key
  //   const {wrapper} = setup();
  //   const ClassInstance = wrapper.instance();
  //   event.target.value="This is a test"

  //   await (ClassInstance.handleChange('commentBody'))(event);
  //   console.log(ClassInstance.state);
    
  //  })

  it('editorRef', () => {  
    const {wrapper} = setup();

    const dummy = () => 'happy' 
    const ClassInstance = wrapper.instance();
    ClassInstance.editorRef(dummy);
    expect(ClassInstance.editor()).toEqual('happy');
  });

  it('handleSubmit', async() => {
    const {wrapper, props} = setup();
    const ClassInstance = wrapper.instance();
    ClassInstance.state.commentBody = Plain.deserialize("This is a test");
    await ClassInstance.handleSubmit();
    expect(props.postComment).toHaveBeenCalled()
  })


  it('throw error when trying to submit less than 2 char.', async() => {
    const {wrapper, props} = setup();
    const ClassInstance = wrapper.instance();
    ClassInstance.state.commentBody = Plain.deserialize(".");
    await ClassInstance.handleSubmit();
    expect(props.postComment).not.toHaveBeenCalled()
    expect(ClassInstance.state.validationError).toEqual('comment should not be less than 2 characters')
  })

  it("handleKeyDown",async () => {
  

  const {wrapper} = setup();
  const ClassInstance = wrapper.instance();
  event.key="Enter"
  ClassInstance.handleKeyDown(event);
  // const editor = wrapper.find('Editor').at(1)
    // const ClassInstance = wrapper.instance();
    // ClassInstance.state.commentBody = Plain.deserialize(".");
    // editor.simulate('keypress', {key: 'Enter'})
  expect(ClassInstance.state.validationError).toEqual('comment is required')

  })

    
});
