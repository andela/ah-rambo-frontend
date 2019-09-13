import SideNav from './SideNav';

const items = [
  {
    text: 'Posts',
    link: '/',
    style: 'NavItem-focus'
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
  items,
};

it('renders successfully', async () => {
  const wrapper = shallow(<SideNav {...props} />);
  expect(wrapper.find('div')).toHaveLength(13);
});

it('exist and contains style', async () => {
  const wrapper = shallow(<SideNav {...props} />);
  expect(wrapper.find('.sideNav')).toHaveLength(1);
});
