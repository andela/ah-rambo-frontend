import CheckPropTypes from 'check-prop-types';
import CommentCard from './CommentCard'



const setup = (propsOverride) => {
  const props = {
  avatar:"",
  userName:"", 
  date:"", 
  commentText:"",
  ...propsOverride,
  }
  const wrapper = shallow(<CommentCard {...props}/>);
  return { props, wrapper };
}

describe('Comment Card Component Test', () => {
  it('renders self without crashing', () => {
    const { wrapper } = setup();

    expect(wrapper.exists()).toBeTruthy();
    expect(wrapper.find('.cards')).toHaveLength(1);
    expect(wrapper.find('.comment-body')).toHaveLength(1);
    expect(wrapper.find('.avatar')).toHaveLength(2);
  })

  it('does not throw a warning with correct prop types', () => {
    const { props } = setup();
    const propsError = CheckPropTypes(
      CommentCard.propTypes,
      props,
      'props',
      CommentCard.name
    );

    expect(propsError).toBeUndefined();
  });



})