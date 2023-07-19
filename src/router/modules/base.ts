import Index from '@/views/index/Index.vue'
import NotFound from '@/views/NotFound.vue'

export default [
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
        meta:{title:"未找到"},
        component: NotFound,
      },
]