import sinon from 'sinon';
import Home from './Home';
import { TotalCategories, categories } from '../../helpers/HomeMockData';

describe('Home component test', () => {
  const url = '/?token=weHackedIt&username=odogwuRambo';
  beforeEach(() => history.replaceState({}, 'Home', url));

  it('renders component successfully', () => {
    const wrapper = shallow(<Home />);
    expect(wrapper.find('div')).toHaveLength(5);
  });
  it('contains an hr element', () => {
    const component = shallow(<Home />);
    expect(component.find('hr')).toHaveLength(1);
  });

  it('mounts Home component and gets correct redirect url and token', () => {
    const component = shallow(<Home />);
    const queryParams = new URLSearchParams(window.location.search);
    expect(component.find('div')).toHaveLength(5);
    expect(window.location.search).toEqual('?token=weHackedIt&username=odogwuRambo');
    expect(queryParams.get('token')).toEqual('weHackedIt');
    expect(queryParams.get('username')).toEqual('odogwuRambo');
  });

  it('returns passed in category if category length is less than seven ', () => {
    const category = [{ demo: 'hi' }];
    expect(TotalCategories([{ demo: 'hi' }])).toEqual(category);
  });

  it('returns only seven items if category length is more than seven ', () => {
    expect(TotalCategories(categories)).toHaveLength(7);
  });
});
