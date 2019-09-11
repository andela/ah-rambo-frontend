import { ReadArticle, mapStateToProps } from './ReadArticle';
import ArticleAuthor from './ArticleAuthor';
import ArticleTags from './ArticleTags';
import ArticleOptions from './ArticleOptions';
import { setToStorage } from '../../helpers/storageHelper';

describe('Read Article component test', () => {
  it('mounts the ReadArticle Component and renders DOM elements', () => {
    const props = {
      article: {},
      history: {
        push: jest.fn()
      },
      match: {
        params: '/article'
      },
      getArticle: jest.fn(),
      loading: false
    };
    const wrapper = shallow(<ReadArticle {...props} />);
    expect(wrapper.find('main')).toHaveLength(1);
    expect(wrapper.find('section')).toHaveLength(3);
  });

  it('renders article body after loading', () => {
    const props = {
      article: {
        title: 'rambo test article',
        articleBody: 'this is the article body',
      },
      match: {
        params: '/article'
      },
      getArticle: jest.fn(),
      loading: false
    };
    const wrapper = shallow(<ReadArticle {...props} />);
    expect(wrapper.find('.article-body')).toHaveLength(1);
  });

  it('renders Article Options when article author is logged in', () => {
    const props = {
      article: {
        title: 'rambo test article',
        Author: {
          firstName: 'Rambo dev',
          lastName: 'Rambo dev',
          userName: 'Rambo dev',
          avatarUrl: 'http:www.url.com'
        },
        articleBody: 'this is the article body',
      },
      match: {
        params: '/article'
      },
      getArticle: jest.fn(),
      loading: false
    };
    setToStorage({'username': 'Rambo dev'});
    const wrapper = shallow(<ReadArticle {...props} />);
    expect(wrapper.find('ArticleOptions')).toHaveLength(1);
  });

  it('renders loading Skeletons when loading is true', () => {
    const props = {
      article: {
        title: 'rambo test article',
      },
      match: {
        params: '/article'
      },
      getArticle: jest.fn(),
      loading: true
    };
    const wrapper = shallow(<ReadArticle {...props} />);
    expect(wrapper.find('Skeleton')).toHaveLength(3);
  });
});

describe('ArticleAuthor component test', () => {
  it('mounts ArticleAuthor and renders DOM elements', () => {
    const props = {
      article: {
        publishedAt: 'rambo test article',
        Author: {
          firstName: 'Rambo dev',
          lastName: 'Rambo dev',
          userName: 'Rambo dev',
          avatarUrl: 'http:www.url.com'
        },
        articleBody: 'this is the article body',
      },
    };
    const wrapper = shallow(<ArticleAuthor {...props} />);
    const element = wrapper.find('.article-author-name').first();
    expect(wrapper.find('div')).toHaveLength(5);
    expect(wrapper.find('img')).toHaveLength(1);
    element.simulate('click');
    element.simulate('keyDown');
  });
});

describe('ArticleTags component test', () => {
  it('mounts ArticleTags and renders DOM elements', () => {
    const props = {
      article: {
        tagList: ['hello', 'world']
      }
    };
    const wrapper = shallow(<ArticleTags {...props} />);
    const button = wrapper.find('.article-tag').first();
    expect(wrapper.find('div')).toHaveLength(1);
    expect(wrapper.find('button')).toHaveLength(2);
    button.simulate('click');
  });
});

describe('ArticleOptions component test', () => {
  it('mounts ArticleOptions and renders DOM elements', () => {
    const wrapper = shallow(<ArticleOptions />);
    expect(wrapper.find('div')).toHaveLength(4);
  });
});

describe('Test mapStateToProps function', () => {
  const state = {
    readArticle: {
      loading: false,
      article: {
        title: 'Rambo'
      },
      error: null
    }
  };

  it('maps the correct state to props', () => {
    expect(mapStateToProps(state)).toBeDefined();
    expect(mapStateToProps(state).loading).toEqual(false);
    expect(mapStateToProps(state).error).toEqual(null);
    expect(mapStateToProps(state).article.title).toEqual('Rambo');
  });
});
