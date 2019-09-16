import Spinner from './spinner';

describe('Spinner test', () => {
  it('renders spins successfully', () => {
    const wrapper = shallow(<Spinner />);
    expect(wrapper.find('div')).toHaveLength(12);
  });
});
