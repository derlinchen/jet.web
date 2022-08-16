import {
    getBreadCrumbList
} from '@/libs/util'

export default {

    state: {
        breadCrumbList: [],
        tagNavList: [],
    },
    mutations: {
        setBreadCrumb(state, route) {
            state.breadCrumbList = getBreadCrumbList(route)
        }
    }
}