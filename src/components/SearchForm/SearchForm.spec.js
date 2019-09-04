import SearchForm from './SearchForm';

const setup = () => {
  const wrapper = shallow(<SearchForm />);
  return { wrapper };
};

describe('SearchForm Component', () => {
  it('renders self without crashing', () => {
    const { wrapper } = setup();

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('input')).toHaveLength(1);
    expect(wrapper.find('img')).toHaveLength(1);
  });
});
