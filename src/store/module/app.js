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
        setBreadCrumb(state, route) {
            state.breadCrumbList = getBreadCrumbList(route)
        },
        addTag(state, { route, type = 'unshift' }) {
            console.log(state.tagNavList)
            let router = getRouteTitleHandled(route)
            if (!routeHasExist(state.tagNavList, router)) {
                state.tagNavList.push(router)
                setTagNavListInLocalstorage([...state.tagNavList])
            }
        },
        closeTag(state, route) {
            let tag = state.tagNavList.filter(item => routeEqual(item, route))
            route = tag[0] ? tag[0] : null
            if (!route) return
            closePage(state, route)
        },
        setTagNavList (state, list) {
            let tagList = []
            if (list) {
              tagList = [...list]
            } else {
                tagList = getTagNavListFromLocalstorage() || []
            }
            state.tagNavList = tagList
            setTagNavListInLocalstorage([...tagList])
          },
    }
}