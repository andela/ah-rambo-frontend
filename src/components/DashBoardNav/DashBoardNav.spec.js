import DashBoard from './DashBoardNav';
const items = [
  {
    text: 'Posts',
    link: '/profile',
    style: 'NavItem'
  },
  {
    text: 'Following',
    link: '/',
    style: 'NavItem'
  },
  {
    text: 'Followers',
    link: '/',
    style: 'NavItem'
  },
  {
    text: 'Likes',
    link: '/',
    style: 'NavItem'
  }
];
const props = {
  items
};
describe('DashBoard Navbar test', () => {
  it('renders successfully', async () => {
    const wrapper = shallow(<DashBoard {...props} />);
    expect(wrapper.find('div')).toHaveLength(5);
  });
});
