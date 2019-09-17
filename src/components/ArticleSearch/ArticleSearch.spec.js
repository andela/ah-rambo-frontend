import ArticleSearch from './ArticleSearch';

const props={
  searchRequest: jest.fn(),
  searchParameter: 'unknown',
  searchLoading:true,
  searchResponse:{},
  searchError:null
}

describe('Article Search test', () => {
  it('renders sucessfully', () => {
    const wrapper = shallow(<ArticleSearch {...props}/>);
    expect(wrapper.find('.article__search__container')).toHaveLength(1);
    expect(props.searchRequest).toHaveBeenCalled();
  });
  it('renders the article Search Card Component when a valid article is received', () => {
    const props2 = {
      searchRequest: jest.fn(),
      searchParameter: 'unknown',
      searchLoading:false,
      searchResponse:{    
      currentPage: 2,
      totalPages: 1,
      itemsOnPage: 0,
      data: {
        count: 3
      },
      },
      searchError:null   
    };
    const wrapper = shallow(<ArticleSearch {...props2}/>);
    expect(wrapper.find('div')).toHaveLength(1);
  });

  it('renders the article Search Card Component when a valid article is received', () => {
    const props2 = {
      searchRequest: jest.fn(),
      searchParameter: 'unknown',
      searchLoading:false,
      searchResponse:{    
      currentPage: 2,
      totalPages: 1,
      itemsOnPage: 0,
      data: {
        count: 3
      },
      },
      searchError:null   
    };
    const wrapper = shallow(<ArticleSearch {...props2}/>);
    expect(wrapper.find('div')).toHaveLength(1);
  });
});
