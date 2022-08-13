import Main from '@/components/main'

export default [

    {
        path: '/',
        name: 'login',
        component: () => import('@/views/login/login.vue')
    }, {
        path: '/home',
        name: 'home',
        component: Main
    }

]