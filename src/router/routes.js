import Main from '@/components/main'

export default [

    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/login.vue')
    }, {
        path: '/',
        name: 'home',
        redirect: '/home',
        component: Main,
        children:[
            {
                path: '/home',
                name: 'home',
                meta: {
                    title: '首页',
                    icon: 'md-home'
                },
                component: () => import('@/views/home')
            }
        ]
    },{
        path: '/system',
        name: 'system',
        component: Main,
        children: [
            {
                path: 'user',
                name: 'user',
                // component: () => import('@/view/components/tree-select/index.vue')
            }, {
                path: 'menu',
                name: 'menu',
            }
        ]
    }

]