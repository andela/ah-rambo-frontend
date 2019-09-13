import {
  HomeIcon,
  CompassIcon,
  BookmarkIcon,
  AlarmIcon
} from '../../../assets/icons';

export const dashBoardNavItems = [
  {
    text: 'Posts',
    link: '/',
    style: 'dashboard__navItem--focus'
  },
  {
    text: 'Following',
    link: '/',
    style: 'dashboard__navItem'
  },
  {
    text: 'Followers',
    link: '/',
    style: 'dashboard__navItem'
  },
  {
    text: 'Likes',
    link: '/',
    style: 'dashboard__navItem'
  }
];

export const sideNavItems = [
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
