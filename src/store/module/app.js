import {
    getBreadCrumbList,
    getHomeRoute
} from '@/libs/util'

import router from '@/router'
import routes from '@/router/routes'
import config from '@/config'
const { homeName } = config

export default {

    state: {
        breadCrumbList: [],
        homeRoute: {},
    },
    mutations: {
        setBreadCrumb(state, route) {
            state.breadCrumbList = getBreadCrumbList(route, state.homeRoute)
        },
        setHomeRoute(state, routes) {
            state.homeRoute = getHomeRoute(routes, homeName)
        }
    }
}