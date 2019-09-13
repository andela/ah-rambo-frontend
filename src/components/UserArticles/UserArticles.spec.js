import UserArticles from './UserArticles';


const userDetails = {};
userDetails.data = [
  {
    id: 21,
    slug: 'rambodevs-adventures-1',
    title: 'RamboDevs Adventures',
    description: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTcsImlhdCI6MTU2NTg3OTA1NiwiZXhwIjoxNTY1OTY1NDU2fQ.pPCDoHAEAeFRvYj9cd7Lq8r2b-2ItS-WMNpD82eGu5Irem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et',
    image: 'http://res.cloudinary.com/teamrambo50/image/upload/v1567524113/pgkcpg4prdi5p2fpiorq.png',
    articleBody: 'dudududuudududuuduududdu',
    authorId: 25,
    categoryId: 1,
    likesCount: 0,
    dislikesCount: 0,
    publishedAt: '2019-09-03T11:48:23.319Z',
    isArchived: false,
    createdAt: '2019-09-03T11:48:23.337Z',
    updatedAt: '2019-09-03T11:48:23.337Z'
  }
];
const userData = {
  firstName: 'Deborah',
  lastName: 'Oke',
  userName: 'Debby',
  avatarUrl: 'https://res.cloudinary.com/teamrambo50/image/upload/v1565160704/avatar-1577909_1280_xsoxql.png',
  followingsCount: 0,
  followersCount: 0,
  location: 'Lagos Nigeria',
  createdAt: 'April, 2018'
};

const props = {
  data: userDetails.data,
  authorData: userData,
  articleUrl:"login"
}

describe('User Article Test', () => {
  it('renders article successfully', () => {
    const wrapper = shallow(<UserArticles {...props}/>);
    expect(wrapper.find('.card')).toHaveLength(1);
  });
});

