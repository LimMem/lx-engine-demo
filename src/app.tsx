import {
  NavBarProps,
  TitleListItem,
  NavBarListItem,
  TabBarProps,
  TabBarListItem,
  setPageNavBar,
  history,
} from 'alita';
import { initBasicConfig } from '@lingxiteam/engine-mobile';

initBasicConfig({
  history,
  setPageNavBar,
});

const titleList: TitleListItem[] = [
  {
    pagePath: '/',
    title: '首页',
  },
];

const navList: NavBarListItem[] = [
  {
    pagePath: '/home',
    navBar: {
      hideNavBar: true,
    },
  },
  {
    pagePath: '/login',
    navBar: {
      hideNavBar: true,
    },
  },
];
const navBar: NavBarProps = {
  navList,
  fixed: true,
};
const tabList: TabBarListItem[] = [];

const tabBar: TabBarProps = {
  color: `#999999`,
  selectedColor: '#00A0FF',
  borderStyle: 'white',
  position: 'bottom',
  list: tabList,
};

export const mobileLayout = {
  documentTitle: '默认标题',
  navBar,
  tabBar,
  titleList,
};
