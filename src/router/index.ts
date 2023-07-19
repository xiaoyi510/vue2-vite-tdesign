/** @format */

import Vue from 'vue';
import VueRouter from 'vue-router';
import { usePermission } from './gurad/permission';
import baseRouters from './modules/base';
import othersRouters from './modules/others';

const env = import.meta.env.MODE || 'development';

Vue.use(VueRouter)


// 存放动态路由
export const asyncRouterList = [...baseRouters,...othersRouters];

// 存放固定的路由
const defaultRouterList = [
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
  {
    path: '*',
    redirect: '/',
  },
  ...asyncRouterList,
];


const createRouter = ():VueRouter =>{
  return new VueRouter({
    mode: 'history',
    base: env === 'site' ? '/starter/vue/' : undefined,
    routes: defaultRouterList,
    scrollBehavior() {
      return { x: 0, y: 0 };
    },
  });
}


const router = createRouter();
usePermission(router)

export function resetRouter() {
  const newRouter = createRouter();
  // router.matcher = newRouter.matcher; // reset router
}
export default router
