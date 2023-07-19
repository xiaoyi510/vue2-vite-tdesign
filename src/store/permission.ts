import { asyncRouterList, resetRouter } from '@/router';
import { defineStore } from 'pinia';

function filterPermissionsRouters(routes, roles) {
  const res: any[] = [];
  routes.forEach((route) => {
    const children: { meta: { roleCode: any; }; name: any; }[] = [];
    route.children?.forEach((childRouter: { meta: { roleCode: any; }; name: any; }) => {
      const roleCode = childRouter.meta?.roleCode || childRouter.name;
      if (roles.indexOf(roleCode) !== -1) {
        children.push(childRouter);
      }
    });
    if (children.length > 0) {
      route.children = children;
      res.push(route);
    }
  });
  return res;
}

export const routerStore = defineStore({
  id: 'router',
  state: () => ({
    whiteListRouters: ['/login'],
    routers: [],
  }),
  getters: {
    routers: (state) => state.routers,
    whiteListRouters: (state) => state.whiteListRouters,
  },
  actions: {
    async initRoutes(roles: string | string[]) {
      let accessedRouters;

      // special token
      if (roles.includes('ALL_ROUTERS')) {
        accessedRouters = asyncRouterList;
      } else {
        accessedRouters = filterPermissionsRouters(asyncRouterList, roles);
      }

      this.setRouters(accessedRouters);

      // register routers
      // router.addRoutes(state.routers);
    },
    restore() {
      // remove routers
      resetRouter();
      this.setRouters([]);
    },
    setRouters(routers) {
        this.routers = routers;
      },
  },

});
