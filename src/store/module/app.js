import {
    getBreadCrumbList,
    getRouteTitleHandled,
    setTagNavListInLocalstorage,
    getTagNavListFromLocalstorage,
    routeHasExist,
    routeEqual,
    getNextRoute
} from '@/libs/util'
import router from '@/router'

const closePage = (state, route) => {
    const nextRoute = getNextRoute(state.tagNavList, route)
    state.tagNavList = state.tagNavList.filter(item => {
        return !routeEqual(item, route)
    })
    router.push(nextRoute)
}


export default {

    state: {
        breadCrumbList: [],
        tagNavList: [],
    },

    mutations: {
        // 设置面包屑，将面包屑信息存入state
        setBreadCrumb(state, route) {
            state.breadCrumbList = getBreadCrumbList(route)
        },

        // 添加导航
        addTag(state, { route, type = 'unshift' }) {
            // 判断路由可执行
            let router = getRouteTitleHandled(route)
            // 判断路由是否存在
            if (!routeHasExist(state.tagNavList, router)) {
                // 不存在则对路由存入导航
                state.tagNavList.push(router)
                setTagNavListInLocalstorage([...state.tagNavList])
            }
        },

        // 关闭导航
        closeTag(state, route) {
            let tag = state.tagNavList.filter(item => routeEqual(item, route))
            route = tag[0] ? tag[0] : null
            if (!route) return
            // 关闭页面
            closePage(state, route)
        },

        // 设置导航
        setTagNavList(state, list) {
            // 设置导航
            let tagList = []
            if (list) {
                tagList = [...list]
            } else {
                tagList = getTagNavListFromLocalstorage() || []
            }

            // 将导航存入state
            state.tagNavList = tagList
            // 将导航存入localstorage
            setTagNavListInLocalstorage([...tagList])
        }
    }
}