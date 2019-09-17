import {
  HomeIcon,
  CompassIcon,
  BookmarkIcon,
  AlarmIcon
} from '../../../assets/icons';

const sideNavItems = [
  {
    type: 'option',
    iconUrl: HomeIcon,
    text: 'Home',
    link: '/',
    style: 'home',
    container: 'sidenav__container--home'
  },
  {
    type: 'option',
    iconUrl: CompassIcon,
    text: 'Explore',
    link: '/',
    style: 'explore',
    container: 'sidenav__container--explore'
  },
  {
    type: 'option',
    iconUrl: AlarmIcon,
    text: 'Notification',
    style: 'notification',
    link: '/',
    container: 'sidenav__container--notification'
  },
  {
    type: 'option',
    iconUrl: BookmarkIcon,
    text: 'BookMarks',
    style: 'bookmark',
    link: '/',
    container: 'sidenav__container--bookmark'
  }
];

export default sideNavItems;
