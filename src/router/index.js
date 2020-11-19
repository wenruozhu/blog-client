import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    base: '/',
    routes: [{
            path: '',
            component: () => import('@/views/article'),
            name: 'index'
        },
        {
            path: '/about',
            component: () => import('@/views/about'),
            name: 'about'
        }, {
            path: '/wall',
            component: () => import('@/views/wall'),
            name: 'wall'
        },
        {
            path: '/article_detail',
            component: () => import('@/views/article_detail'),
            name: 'article_detail'
        },
    ]
})
export default router