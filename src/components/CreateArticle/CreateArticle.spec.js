import Html from 'slate-html-serializer';
import { CreateArticle, mapDispatchToProps } from './CreateArticle'
import ArticleBody from './ArticleBody';
import { descriptionValidity, tagsValidity } from './CreateArticleValidations';
import fetchData from '../../helpers';

const htmlSerializer = new Html();

const store = {
  isLoading: false,
  allTags: ['...'],
  allCategories: ['...'],
  data: null,
  error: null
};

const dispatch = jest.fn();
const push = jest.fn();
const img = new Image(600,600);
const smallImg = new Image();
const props = {
  data: {
    createArticleReducer: {
      ...store
    }
  },
  getAllTags: jest.fn(),
  getAllCategories: jest.fn(),
  history:{
    push: jest.fn(),
  },
  createArticleDispatch: jest.fn(),
}

global.URL = {
  createObjectURL: (input) => "https://picsum.photos/600/600"
}
global.serializer = {
  serialize: jest.fn()
}

global.Plain = {
  serialize: jest.fn()
}

const getEventTransfer = jest.fn().mockReturnValue({
  type: 'html',
})

const wrapper = shallow( <CreateArticle {...props} /> );
let instance = wrapper.instance();

const event = {
  target: {
    files:[new File(['dummy content'], 'example.png', {type: 'image/png'})],
  },
  preventDefault: jest.fn(),
  nativeEvent: jest.fn()
  
}
const otherEvents = (value) => ({
  target: {
    value
  }
})

describe('Article Description Test', () => {
  let imageOnload = null;

  const trackImageOnload = () => {
      Object.defineProperty(Image.prototype, 'onload', {
          get: function () {

              return this._onload;
          },
          set: function (fn) {
              imageOnload = fn;
              this._onload = fn;
          },
      });
  }

  it('Renders default component', () => {    
    wrapper.setState({ stage: 3 });
    expect(wrapper.find('h1').exists()).toBe(true);
    expect(wrapper.find('h1').text()).toBe('Last Page');
  });
  it('Renders ArticleDescription component', () => {    
    wrapper.setState({ stage: 2 });
    expect(wrapper.find('ArticleDescription').dive().find('div').at(3).hasClass('article-card')).toBe(true);
  });
  it('Updates image state when handleFileChange is called', async () => {   
    wrapper.setState({ stage: 1 }); 
    await instance.handleFileChange(event);
    expect(instance.state.image).toEqual('');
  });
  it('onMarkClick', () => { 
    instance.editor = {
      toggleMark: jest.fn()
    }     
    instance.onMarkClick(event, 'bold');
    expect(instance.editor.toggleMark).toHaveBeenCalled();
  });
  it('removeImage', () => {  
    instance.removeImage();
    expect(instance.state.image).toEqual('');
  });
  it('returns to prevStage', () => { 
    wrapper.setState({ stage: 2 }); 
    instance.prevStage();
    expect(instance.state.stage).toEqual(1);
  });
  it('goes to nextStage', () => {  
    instance.nextStage(event);
    expect(instance.state.stage).toEqual(2);

    instance.state.stage = 1;
    instance.state.articleBodyError="gfhgfyfgtf";
    let res = instance.nextStage(event);
    expect(instance.state.stage).toEqual(1);
    expect(res).toEqual(null);

    instance.state.titleError="gfhgfyfgtf";
    res = instance.nextStage(event);
    expect(instance.state.stage).toEqual(1);
    expect(res).toEqual(null);
  });
  it('ref', () => {  
    const dummy = () => 'happy' 
    instance.ref(dummy);
    expect(instance.editor()).toEqual('happy');
  });

  it('handleKeyPress ', async () => {
    const newWrapper = shallow( <CreateArticle {...props} />)
    const newInstance = newWrapper.instance();
    delete event.key;
    event.value = 'kindly';
    await (newInstance.handleKeyPress('draft'))(event)
    expect(newInstance.state.tags).toEqual('')
    
    event.target.name = 'myTags';
    event.target.value = 'k';
    event.key= 'Enter';
    newInstance.state.tags = 'kindly';
    (newInstance.handleKeyPress('draft'))(event)
    expect(newInstance.state.tags).toEqual('kindly')
  });

  it('removeTag', async () => {
    instance.state.taglist="hello,just"
    await (instance.removeTag('hello'))(event)
    expect(instance.state.taglist).toEqual('just');
  });
  
  it('setError', async () => {
    instance.state.taglist="hello,just"
    await instance.setError('tagError', '///', tagsValidity, instance.state.taglist);
    expect(instance.state.tagError).not.toEqual('');
  });

  it('handleBlur', async () => {
    const newEvent = {
      target: {
        value:",just"
      },
      preventDefault: jest.fn()
    }
    
    await (instance.handleBlur('descriptionError', descriptionValidity))(newEvent);
    expect(instance.state.descriptionError).not.toEqual('');

    delete newEvent.target
    newEvent.value="//,just"
    await (instance.handleBlur('descriptionError', descriptionValidity))(newEvent);
    expect(instance.state.descriptionError).not.toEqual('');
  });

  it('handleFocus', async () => {
    delete event.key
    await (instance.handleFocus('tagError'))(event);
    expect(instance.state.tagError).toEqual('');

    event.key="Enter"
    const res = await (instance.handleFocus('tagError'))(event);
    expect(res).toEqual(null);
  });

  it('handleTagChange', async () => {
    instance.state.tags='helloagain'
    await instance.handleTagChange('helloagain');
    expect(instance.state.taglist).toEqual('hello,just,helloagain');
    expect(instance.state.tags).toEqual('');

    instance.state.tagError='khkuhuh'
    instance.state.tags='helloagain'
    await instance.handleTagChange('helloagain');
    expect(instance.state.taglist).toEqual('hello,just,helloagain');
    expect(instance.state.tags).toEqual('helloagain');
  });

  it('handleChange', async () => {
    delete event.key
    const newWrapper = shallow( <CreateArticle {...props} />)
    const newInstance = newWrapper.instance();
    event.target.value="just"
    await (newInstance.handleChange('tags'))(event);
    expect(newInstance.state.tags).toEqual('just');

    delete event.target;
    event.value="just"
    event.key="Enter"
    newInstance.state.tagError="jghgh"

    await (newInstance.handleChange('tags'))(event);

    expect(newInstance.state.tags).toEqual('just');
  });

  it('handleSubmit', async () => {
    const newWrapper = shallow( <CreateArticle {...props} />);
    const newInstance = newWrapper.instance();
    delete newInstance.state.file
    delete newInstance.state.title
    delete newInstance.state.category
    delete newInstance.state.taglist
    delete newInstance.state.description
    delete newInstance.state.articleBody
    await (newInstance.handleSubmit(null))(event)
    expect(props.createArticleDispatch).toHaveBeenCalled();

    newInstance.state.tagError = 'Heelo'
    await (newInstance.handleSubmit(null))(event)
    expect(props.createArticleDispatch).toHaveBeenCalled();
});

it('handleSubmit', async () => {
  const newWrapper = shallow( <CreateArticle {...props} />)
  const newInstance = newWrapper.instance();
    delete newInstance.state.categoryError
    delete newInstance.state.tagError
    delete newInstance.state.descriptionError
    newInstance.state.file=new File(['dummy content'], 'example.png', {type: 'image/png'});
    newInstance.state.title="Demo Title";
    newInstance.state.category="Demo Category";
    newInstance.state.taglist="Demo tags";
    newInstance.state.description="Demo Description";
    newInstance.state.articleBody= htmlSerializer.deserialize("Demo articleBody");
    await (newInstance.handleSubmit('draft'))(event);
    expect(props.createArticleDispatch).toHaveBeenCalled();

newInstance.state.articleBody= htmlSerializer.deserialize("");
    await (newInstance.handleSubmit('s'))(event);
    expect(props.createArticleDispatch).toHaveBeenCalled();
  });
  
  it('handleFileChange', () => {
    const Wrapper = shallow( <CreateArticle {...props} /> );
    const Instance = Wrapper.instance();
    trackImageOnload();
    (Instance.handleFileChange(img))({target: {
      files:[new File(['dummy content'], 'example.png', {type: 'image/png'})],
    }});
    imageOnload();
    (Instance.handleFileChange(smallImg))({target: {
      files:[new File(['dummy content'], 'example.png', {type: 'image/png'})],
    }});
    imageOnload();
    expect(instance.state.image).toBe('')
  });

  it('renderMarkButton', () => {
    const Wrapper = shallow( <CreateArticle {...props} /> );
    const Instance = Wrapper.instance();
    Instance.onMarkClick = jest.fn();
    Wrapper.find('ArticleBody').dive().find('Button').at(2).dive().simulate('pointerDown')
    expect(Instance.onMarkClick).toHaveBeenCalled();

    Instance.hasMark = jest.fn().mockReturnValue(true);
    Wrapper.find('ArticleBody').dive().find('Button').at(2).dive().simulate('pointerDown')
    expect(Instance.onMarkClick).toHaveBeenCalled();
  });
  
  it('renderBlockButton', () => {
    const Wrapper = shallow( <CreateArticle {...props} /> );
    const Instances = Wrapper.instance();
    Instances.onClickBlock = jest.fn();
    Wrapper.find('ArticleBody').dive().find('Button').at(6).dive().simulate('pointerDown')
    expect(Instances.onClickBlock).toHaveBeenCalled();

    Instances.hasBlock = jest.fn().mockReturnValue(true);
    Wrapper.find('ArticleBody').dive().find('Button').at(6).dive().simulate('pointerDown')
    expect(Instances.onClickBlock).toHaveBeenCalled();

    Instances.state.articleBody = { ...Instances.state.articleBody, document: '', blocks: { size: 0 }, activeMarks: {some: jest.fn()}};
    
    expect(Wrapper.find('ArticleBody').dive().find('Button').at(6).dive().find('button')).toBeTruthy();
  });

  it('onPaste', () => {
    const Wrapper = shallow( <CreateArticle {...props} /> );
    const Instance = Wrapper.instance();

    const editor = {
      insertFragment: jest.fn()
    }
    const next = jest.fn();
    Instance.onPaste({
      target: {
        files:[new File(['dummy content'], 'example.png', {type: 'image/png'})],
      },
      preventDefault: jest.fn(),
      clipboardData: { types: ['text/html'], getData: jest.fn(), type: 'html'},
      
    }, editor, next);
    expect(next).toHaveBeenCalled();
  });

  it('onPaste 2', () => {
    const Wrapper = shallow( <CreateArticle {...props} /> );
    const Instance = Wrapper.instance();

    const editor = {
      insertFragment: jest.fn()
    }
    const next = jest.fn();
    Instance.onPaste({
      target: {
        files:[new File(['dummy content'], 'example.png', {type: 'image/png'})],
      },
      preventDefault: jest.fn(),
      clipboardData: { types: ['text/html'], getData: () => 'hello', type: 'html'},
      
    }, editor, next);
    expect(editor.insertFragment).toHaveBeenCalled();
  });
});

describe('', () => {
  const Wrapper = shallow( <CreateArticle {...props} /> );
  const Instance = Wrapper.instance();
  Instance.editor = {
    value: {
      document: {
        getClosest: jest.fn().mockReturnValue("hello"),
      },
      blocks: [{
        key: 'hi'
      }],
    },
    unwrapBlock: jest.fn(() => jest.fn()).mockReturnValue({
      wrapBlock: jest.fn(),
    }),
    setBlocks: jest.fn().mockReturnValue({
      unwrapBlock: jest.fn().mockReturnValue({
        unwrapBlock: jest.fn(),
      }),
      wrapBlock: jest.fn(),
    })
  };

  it('onClickBlock 1', () => {
    Instance.editor.upwrapBlock = jest.fn().mockReturnValue("hello");
    Wrapper.find('ArticleBody').dive().find('Button').at(6).dive().simulate('pointerDown', {
      preventDefault: jest.fn()
    });
    expect(Instance.editor.setBlocks().wrapBlock).toHaveBeenCalled();
  });
  it('onClickBlock 2', () => {
    Instance.hasBlock = (type) => type === 'list-item';
    Instance.editor.value.blocks.some = jest.fn().mockReturnValue(false);
    Wrapper.find('ArticleBody').dive().find('Button').at(5).dive().simulate('pointerDown', {
      preventDefault: jest.fn()
    });
    expect(Instance.editor.unwrapBlock().wrapBlock).toHaveBeenCalled();
    Wrapper.find('ArticleBody').dive().find('Button').at(6).dive().simulate('pointerDown', {
      preventDefault: jest.fn()
    });
    expect(Instance.editor.unwrapBlock().wrapBlock).toHaveBeenCalled();
  });
  it('onClickBlock 3', () => {
    Instance.editor.value.blocks.some = jest.fn().mockReturnValue(true);
    Instance.hasBlock = (type) => type === 'list-item';
    Wrapper.find('ArticleBody').dive().find('Button').at(5).dive().simulate('pointerDown', {
      preventDefault: jest.fn()
    });
    expect(Instance.editor.setBlocks().unwrapBlock().unwrapBlock).toHaveBeenCalled();
  });
  it('onClickBlock 4', () => {
    Instance.hasBlock = (type) => type === 'list-item';
    Wrapper.find('ArticleBody').dive().find('Button').at(7).dive().simulate('pointerDown', {
      preventDefault: jest.fn()
    });
    expect(Instance.editor.setBlocks().unwrapBlock().unwrapBlock).toHaveBeenCalled();

    Instance.hasBlock = (type) => true;
    Wrapper.find('ArticleBody').dive().find('Button').at(7).dive().simulate('pointerDown', {
      preventDefault: jest.fn()
    });
    expect(Instance.editor.setBlocks().unwrapBlock().unwrapBlock).toHaveBeenCalled();
  });
  it('onClickBlock 5', () => {
    Instance.hasBlock = (type) => false;
    Wrapper.find('ArticleBody').dive().find('Button').at(7).dive().simulate('pointerDown', {
      preventDefault: jest.fn()
    });
    expect(Instance.editor.setBlocks().unwrapBlock().unwrapBlock).toHaveBeenCalled();

    Instance.hasBlock = (type) => !(type === 'list-item');
    Wrapper.find('ArticleBody').dive().find('Button').at(7).dive().simulate('pointerDown', {
      preventDefault: jest.fn()
    });
    expect(Instance.editor.setBlocks().unwrapBlock().unwrapBlock).toHaveBeenCalled();
  });
})


describe('Map Dispatch To Props Test', () => {
  it('should ', () => {
    const res = mapDispatchToProps(dispatch);
    expect(typeof res.createArticleDispatch).toEqual('function')

    res.createArticleDispatch('body', push)
    expect(dispatch).toHaveBeenCalled();

    res.getAllTags()
    expect(dispatch).toHaveBeenCalled();

    res.getAllCategories()
    expect(dispatch).toHaveBeenCalled();
    
  });
});
