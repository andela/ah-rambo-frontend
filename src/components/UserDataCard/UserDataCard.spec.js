import UserDataCard from './UserDataCard';

const props = {};
props.userDetails = {
    firstName: 'Deborah',
    lastName: 'Oke',
    userName: 'Debby',
    avatarUrl: 'https://res.cloudinary.com/teamrambo50/image/upload/v1565160704/avatar-1577909_1280_xsoxql.png',
    followingsCount: 0,
    followersCount: 0,
    location: 'Lagos Nigeria',
    createdAt: 'April, 2018'
  };
props.total = 1;

const props2 = {
  userDetails: 
    {
      firstName: 'Deborah',
      lastName: 'Oke',
      userName: 'Debby',
      avatarUrl: 'https://res.cloudinary.com/teamrambo50/image/upload/v1565160704/avatar-1577909_1280_xsoxql.png',
      followingsCount: 0,
      followersCount: 0,
      location: null,
      createdAt: null  
  },
  total: 3
}

describe('UserData Card Test', () => {
  it('renders sucessfully', () => {
    const wrapper = shallow(<UserDataCard {...props}/>);
    expect(wrapper.find('.user--card--data')).toHaveLength(1);
  });
  it('renders sucessfully without createdAt and location', () => {
    const wrapper = shallow(<UserDataCard {...props2}/>);
    expect(wrapper.find('.bold')).toHaveLength(1);
  });
});


