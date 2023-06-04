import type { RouteObject } from 'react-router-dom';
import { Navigate, createBrowserRouter, redirect } from 'react-router-dom';
import type { Key } from 'react';
import { lazy } from 'react';
import { cloneDeep } from 'lodash-es';
import defaultRoute from './modules';
import type { MenuItem, RouteList } from '@/router/route';
import { getRouteApi } from '@/server/route';
import type { AsyncRouteType } from '@/store/modules/route';
import { setStoreAsyncRouter } from '@/store/modules/route';
import store from '@/store';
import type { UseInfoType } from '@/api/auth';
const ErrorElement = lazy(() => import('@/views/core/error/ErrorElement'));

// import { HomeOutlined } from '@ant-design/icons';

export async function initAsyncRoute(user: UseInfoType) {
  const res = await getRouteApi({ role: user.power }, { token: user.token });
  if (res.data.length) {
    store.dispatch(setStoreAsyncRouter(res.data));
  }
  return '';
}

export function handlePowerRoute(
  dataRouter: AsyncRouteType[],
  routerList: RouteList[] = defaultRoute,
) {
  const newRouteList: RouteList[] = [];
  routerList.forEach((i) => {
    const item = cloneDeep(i);
    if (!item.meta.whiteList) {
      const rItem = dataRouter.find((r) => r.id === item.id);
      if (rItem) {
        if (rItem.children && rItem.children.length && item.children && item.children.length) {
          const children = handlePowerRoute(rItem.children, item.children);
          item.children = children;
          if (children) newRouteList.push(item);
        } else {
          newRouteList.push(item);
        }
      }
    } else {
      newRouteList.push(item);
    }
  });
  return newRouteList;
}

export function handleRouteList(list: RouteList[]): RouteObject[] {
  return list.map((i: RouteList) => {
    const item: RouteObject = {
      path: i.path,
      id: i.id,
      element: i.element,
    };

    if (i.element) {
      item.errorElement = <ErrorElement pageType="Page" />;
    }

    if (i.children) {
      item.children = handleRouteList(i.children);
      if (i.redirect && item.children.length) {
        item.children.push({
          index: true,
          element: <Navigate to={i.redirect} />,
          loader() {
            return redirect(i.redirect || '');
          },
        });
      }
    }

    return item;
  });
}

export function createRouterList(routeList: RouteObject[]) {
  return createBrowserRouter(routeList);
}

export function routeListToMenu(rtList: RouteList[], path?: React.Key): MenuItem[] {
  const menuList: MenuItem[] = [];
  rtList.forEach((i: RouteList) => {
    const item = i;
    if (item.meta.hideSidebar) return;

    if (!item.alwaysShow && item.alwaysShow !== undefined && !item.element) {
      if (item.children && item.children[0]) {
        menuList.push(routeListToMenu([item.children[0]], item.path)[0]);
        return;
      }
    }

    let rtItem: MenuItem = {
      key: item.path,
      label: '',
    };
    if (path) rtItem.key = `${path}/${item.path}`;

    rtItem = { ...rtItem, label: item.meta.label, icon: item.meta.icon };

    if (item.children && !item.element) {
      rtItem.children = routeListToMenu(item.children, rtItem.key);
    }

    menuList.push(rtItem);
  });

  return menuList;
}

// "Get the parent path of a given path."
export function getParentPaths(routePath: string, routes: MenuItem[]): string[] {
  // "Perform a depth-first search to find."
  function dfs(routes: MenuItem[], key: string, parents: string[]) {
    for (let i = 0; i < routes.length; i++) {
      const item = routes[i];
      // "If the key is found, return the parent key."
      if (item.key === key) return [item.key];
      //"If the 'children' property does not exist or is empty, do not recurse."
      if (!item.children || !item.children.length) continue;
      // "When searching down the hierarchy, push the current key onto the stack."
      parents.push(item.key as string);

      if (dfs(item.children, key, parents).length) return parents;
      // "When a depth-first search is unsuccessful, pop the current path off the stack."
      parents.pop();
    }
    //"Return an empty array if not found".
    return [];
  }
  return dfs(routes, routePath, []);
}

//"Retrieve the routing information for the corresponding path".
export function findRouteByPath(path: Key, routes: MenuItem[]): MenuItem | null {
  const res = routes.find((item) => item.key == path) || null;
  if (res) {
    return res;
  } else {
    for (let i = 0; i < routes.length; i++) {
      if (routes[i].children instanceof Array && routes[i].children?.length) {
        const miRes = findRouteByPath(path, routes[i].children as MenuItem[]);
        if (miRes) {
          return miRes;
        } else {
          if (routes[i].key == path) return routes[i];
        }
      }
    }
    return null;
  }
}

// "Join paths using a pseudo path resolver".
function pathResolve(...paths: string[]) {
  let resolvePath = '';
  let isAbsolutePath = false;
  for (let i = paths.length - 1; i > -1; i--) {
    const path = paths[i];
    if (isAbsolutePath) {
      break;
    }
    if (!path) {
      continue;
    }
    resolvePath = path + '/' + resolvePath;
    isAbsolutePath = path.charCodeAt(0) === 47;
  }
  if (/^\/+$/.test(resolvePath)) {
    resolvePath = resolvePath.replace(/(\/+)/, '/');
  } else {
    resolvePath = resolvePath
      .replace(/(?!^)\w+\/+\.{2}\//g, '')
      .replace(/(?!^)\.\//g, '')
      .replace(/\/+$/, '');
  }
  return resolvePath;
}

// "Set the complete route path."
export function setUpRoutePath(routeList: AsyncRouteType[], pathName = '') {
  for (const node of routeList) {
    if (pathName) {
      node.path = pathResolve(pathName, node.path || '');
    }
    if (node.children && node.children.length) {
      setUpRoutePath(node.children, node.path);
    }
  }
  return routeList;
}

// "Flat routing."
export function formatFlatteningRoutes(routesList: AsyncRouteType[]) {
  if (routesList.length === 0) return routesList;
  let hierarchyList = routesList;
  for (let i = 0; i < hierarchyList.length; i++) {
    if (hierarchyList[i].children) {
      hierarchyList = hierarchyList
        .slice(0, i + 1)
        .concat(hierarchyList[i].children || [], hierarchyList.slice(i + 1));
    }
  }
  return hierarchyList;
}
