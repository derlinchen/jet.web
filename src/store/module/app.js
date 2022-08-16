import {
    getBreadCrumbList,
    getRouteTitleHandled,
    setTagNavListInLocalstorage,
    routeHasExist
} from '@/libs/util'

export default {

    state: {
        breadCrumbList: [],
        tagNavList: [],
    },
    mutations: {
        setBreadCrumb(state, route) {
            state.breadCrumbList = getBreadCrumbList(route)
        },
        addTag(state, { route, type = 'unshift' }) {
            let router = getRouteTitleHandled(route)
            if (!routeHasExist(state.tagNavList, router)) {
                state.tagNavList.push(router)
                setTagNavListInLocalstorage([...state.tagNavList])
            }
        },
    }
}