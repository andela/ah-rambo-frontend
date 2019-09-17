import Pagination from './Pagination';

const props={
  query: "article",
  parameter: "pagination-test",
  totalPages: 3,
  searchRequest: jest.fn(),
  currentPage: 2
}

describe("Pagination component Test", () => {
  it('renders successfully', () => {
    const wrapper = shallow(<Pagination {...props}/>)
    expect(wrapper.find('.pagination')).toHaveLength(1);
  });
  it('navigate back to previous page on paginated articles', () => {
    const wrapper = mount(<Pagination {...props}/>);
    wrapper.find('.navigation-back').simulate('click');
    expect(props.searchRequest).toHaveBeenCalled();
  });
  it('navigate to next page on paginated articles', () => {
    const wrapper = mount(<Pagination {...props}/>);
    wrapper.find('.navigation-next').simulate('click');
    expect(props.searchRequest).toHaveBeenCalled();
  });
  it('clicks on the articles page', () => {
    const props={
      query: "article",
      parameter: "pagination-test",
      totalPages: 1,
      searchRequest: jest.fn(),
      currentPage: 0
    }
    const wrapper = mount(<Pagination {...props}/>);
    wrapper.find('.non-active').simulate('click');
    expect(props.searchRequest).toHaveBeenCalled();
  });
  it('does not paginate empty articles', () => {
    const props={
      query: "article",
      parameter: "pagination-test",
      totalPages: 0,
      searchRequest: jest.fn(),
      currentPage: 0
    }
    const wrapper = mount(<Pagination {...props}/>);
    const nexText = wrapper.find('.navigation-back').text();
    const backText= wrapper.find('.navigation-next').text();
    expect(nexText).toEqual('');
    expect(backText).toEqual('');
  });
});


