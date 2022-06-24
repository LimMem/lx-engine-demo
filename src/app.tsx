import {
  RequestConfig,
  NavBarProps,
  TitleListItem,
  NavBarListItem,
  TabBarProps,
  TabBarListItem,
  setPageNavBar,
  history,
} from 'alita';
import {
  lcdpApi,
  initBasicConfig,
  renderBefore,
  authLoginService,
  getKeepAlive,
  queryDynamicRoutesService,
} from '@lingxiteam/engine-mobile';

initBasicConfig({
  history,
  setPageNavBar,
});

// const login = {
//   success: async () => {
//     try {
//       const e = (await authLoginService()) as any;
//       const { loginInfo = {} } = e?.resultObject || {};
//       lcdpApi.setData('user', loginInfo || {});
//       history.push({
//         pathname: '/',
//       });
//     } catch (error) {
//       console.log(error);
//     }
//   },
//   updateRoutes: async (routes: any[], next: (arg0: any[]) => void) => {
//     const dynamicRoutes = await queryDynamicRoutesService();
//     const targetRoutes = merge(routes, dynamicRoutes);
//     routes[0].routes = targetRoutes;
//     next(routes);
//   },
// };

// const auth = {
//   fail: () => {
//     // saveRedirctUrl(history?.location?.pathname, history?.location?.query);
//     if (history) {
//       history.push({
//         pathname: '/login',
//       });
//     }
//   },
//   success: (e: { resultObject: { loginInfo?: {} | undefined } }) => {
//     const { loginInfo = {} } = e?.resultObject;
//     lcdpApi.setData('user', loginInfo || {});
//   },
// };

// const page = {
//   onListener: (pageData: any) => {
//     const pageTitle = document.querySelector('.alita-layout-head .am-navbar-title');
//     if (pageTitle) {
//       pageTitle.innerHTML = pageData.pageName;
//     }
//   },
// };

// lcdpApi.handleMessage = {
//   login,
//   auth,
//   page,
// };

const merge = (routes: any[], dynamicRoutes: any[]) => {
  let targetRoutes: any[] = [];
  if (routes.length > 0) {
    targetRoutes = routes[0].routes || [];
  }
  dynamicRoutes.forEach((route) => {
    // 页面路由 > 动态路由 > 内置路由
    const repeatRoute = targetRoutes.find((t) => t.path === route.path);
    if (!repeatRoute) {
      targetRoutes.push(route);
    }
  });
  return targetRoutes;
};

let dRoutes: any[] = [];
// export function patchRoutes({ routes }: any) {
//   let targetRoutes = merge(routes, dRoutes);
//   const homePath = targetRoutes.find((item) => item.path === '/index');
//   // const hasHomePath = extraRoutes.filter(item => item.path === '/index');
//   if (homePath) {
//     targetRoutes = targetRoutes.map((item: any) => {
//       if (item.path === '/') {
//         return { ...homePath, path: item.path };
//       }
//       return item;
//     });
//   }
//   // eslint-disable-next-line no-param-reassign
//   routes[0].routes = targetRoutes;
// }

// export async function render(oldRender: () => void) {
//   try {
//     dRoutes = await renderBefore();
//     const pathname = history?.location?.pathname;
//     if (pathname) {
//       const findObject = dRoutes.find((e) => e.path === pathname);
//       if (!findObject) {
//         auth.fail();
//       }
//     } else {
//       auth.fail();
//     }
//     oldRender();
//   } catch (error) {
//     console.log(error);
//     oldRender();
//   }
// }

// export { getKeepAlive };

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
