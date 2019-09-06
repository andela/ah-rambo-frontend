import SocialLogin from './SocialLogin';

describe('Social Login Tests', () => {
  it('tests the social login component', () => {
    const wrapper = shallow(<SocialLogin />);
    expect(wrapper.find('a')).toHaveLength(3);
    expect(wrapper.find('img')).toHaveLength(3);
  });
});
