import Main from '@/components/main'

export default [
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login/login.vue')
    }, {
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
        path: '/homePage',
        name: '_homePage',
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
                path: 'userManage',
                name: 'userManage',
                meta: {
                    title: '用户管理'
                },
                component: () => import('@/views/system/user/userManage.vue')
            }, {
                path: 'menuManage',
                name: 'menuManage',
                meta: {
                    title: '菜单管理'
                },
                component: () => import('@/views/system/menu/menuManage.vue')
            }, {
                path: 'roleManage',
                name: 'roleManage',
                meta: {
                    title: '角色管理'
                },
                component: () => import('@/views/system/role/roleManage.vue')
            }
        ]
    }

]