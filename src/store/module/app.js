import {
    getBreadCrumbList
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
            state.breadCrumbList = getBreadCrumbList(route)
        }
    }
}