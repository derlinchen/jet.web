import {
    login,
    logout,
    editPassword
} from '@/api/login'

import config from '@/config'

import {
    setMenuListInLocalstorage,
    getMenuListFromLocalstorage,
    setUserInfoInLocalstorage,
    getUserInfoFromLocalstorage,
    setTagNavListInLocalstorage,
    getTagNavListFromLocalstorage,
} from '@/libs/util'

export default {
    mutations: {
        setUserInfo(state, userInfo) {
            setUserInfoInLocalstorage(userInfo)
        },
        setMenuList(state, menuList) {
            setMenuListInLocalstorage([...menuList])
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
    },

    getters: {
        getMenuList() {
            return getMenuListFromLocalstorage()
        },
        getUserInfo() {
            return getUserInfoFromLocalstorage()
        }
    },

    actions: {
        handleLogin({ commit }, { userCode, password }) {
            userCode = userCode.trim()
            return new Promise((resolve) => {
                login({
                    userCode,
                    password
                }).then(res => {
                    const data = res.data
                    let userInfo = {
                        userCode: data.userCode,
                        token: data.token,
                        userName: data.userName
                    }
                    commit('setUserInfo', userInfo)
                    commit('setMenuList', data.menuList)
                    const defaultRoute = data.menuList[0].name
                    resolve(defaultRoute)
                }).catch(err => {

                })
            })
        },
        handleLogOut({ commit }) {
            return new Promise((resolve) => {
                let token = this.getters.getUserInfo.token
                logout({
                    token
                }).then(res => {
                    commit('setUserInfo', {})
                    commit('setMenuList', [])
                    commit('setTagNavList',[])
                    resolve(config.loginName)
                }).catch(err => {

                })
            })
        },

        handleEditPassword({ commit }, param) {
            return new Promise((resolve) => {
                editPassword(param).then(res => {
                    commit('setUserInfo', {})
                    commit('setMenuList', [])
                    resolve(res)
                })
            })
        }
    }
}