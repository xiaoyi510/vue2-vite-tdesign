/** @format */

import Vue from 'vue'
import type { RouteConfig } from 'vue-router'
import VueRouter from 'vue-router'
import { usePermission } from './gurad/permission'
import Index from '@/views/index/Index.vue'
import NotFound from '@/views/NotFound.vue'

Vue.use(VueRouter)

export const routes: RouteConfig[] = [
  {
    path: '/',
    name: 'Home',
    // NOTE: you can also apply meta information
    // meta: {authRequired: false }
    meta: { title: '首页' },
    component: Index,
    // NOTE: you can also lazy-load the component
    // component: () => import("@/views/About.vue")
  },
  {
    path: '/check',
    name: 'check',
    meta: { title: '在线校验' },
    component: () => import('@/views/check/index.vue'),
  },
  {
    path: '/:path(.*)',
    name: 'NotFound',
    component: NotFound,
  },
]

const router = new VueRouter({
  base: '/',
  mode: 'history',
  routes,
})

usePermission(router)

export default router
