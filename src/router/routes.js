import Main from '@/components/main'

export default [

    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/login.vue')
    },{
        path: '/',
        name: '_index',
        redirect: '/index',
        component: Main,
        meta: {
            hideInMenu: true,
            notCache: true
        },
        children: [
            {
                path: '/index',
                name: 'index',
                component: () => import('@/views/index')
            }
        ]
    }, {
        path: '/',
        name: '_home',
        redirect: '/home',
        component: Main,
        meta: {
            hideInMenu: true,
            notCache: true
        },
        children: [
            {
                path: '/home',
                name: 'home',
                meta: {
                    title: '首页'
                },
                component: () => import('@/views/home')
            }
        ]
    }, {
        path: '/system',
        name: 'system',
        component: Main,
        meta: {
            title: '系统管理'
        },
        children: [
            {
                path: 'user',
                name: 'user',
                meta: {
                    title: '用户管理'
                },
                component: () => import('@/views/system/user/user.vue')
            }, {
                path: 'menu',
                name: 'menu',
                meta: {
                    title: '菜单管理'
                },
                component: () => import('@/views/system/menu/menu.vue')
            }
        ]
    }

]