import ArticleSearchCard from './ArticleSearchCard';

const props = {
  searchResponse: {
    currentPage: 2,
    totalPages: 1,
    itemsOnPage: 0,
    data: {
        count: 10,
        results: [
          {
         1: {
          id: 17,
          slug: 'presentation-and-demo-10',
          title: 'presentation title',
          description: 'description name',
          image: 'http://res.cloudinary.com/teamrambo50/image/upload/v1568299936/z5dizqto8bu8pzp18itm.jpg',
          articleBody: 'dudududuudududuuduududdu',
          likesCount: 0,
          dislikesCount: 0,
          publishedAt: '2019-09-12T14:52:16.066Z',
          comments: []
          }
        }
        ]
  }
}
}

describe('Article Search Card Test', () => {
  it('renders the article Card successfully when the description is not empty', () => {
    const wrapper = shallow(<ArticleSearchCard {...props}/>);
    expect(wrapper.find('.article__search__card')).toHaveLength(1);
  });
  it('renders the article Card successfully when the description is not empty', () => {
    const props = {
      searchResponse: {
        currentPage: 2,
        totalPages: 1,
        itemsOnPage: 0,
        data: {
            count: 10,
            results: [
              {
             1: {
              id: 17,
              slug: 'presentation-and-demo-10',
              title: 'presentation title',
              description: null,
              image: 'http://res.cloudinary.com/teamrambo50/image/upload/v1568299936/z5dizqto8bu8pzp18itm.jpg',
              articleBody: 'dudududuudududuuduududdu',
              likesCount: 0,
              dislikesCount: 0,
              publishedAt: '2019-09-12T14:52:16.066Z',
              comments: []
              }
            }
            ]
      }
    }
    }
    const wrapper = shallow(<ArticleSearchCard {...props}/>);
    expect(wrapper.find('.article__search__card')).toHaveLength(1);
  });
  it('fails to render the article Card when no data is returned', () => {
    const props = {
      searchResponse: {
        currentPage: 2,
        totalPages: 1,
        itemsOnPage: 0,
        data: {
          count: 0,
          results: []
        },
      }}
    const wrapper = shallow(<ArticleSearchCard {...props}/>);
    expect(wrapper.find('.article__search__card')).toHaveLength(0);
  });
});
