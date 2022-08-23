import {
    login,
    logout
} from '@/api/login'

import config from '@/config'

import {
    setMenuListInLocalstorage,
    getMenuListFromLocalstorage,
    setUserInfoInLocalstorage,
    getUserInfoFromLocalstorage
} from '@/libs/util'

export default {
    mutations: {
        setUserInfo(state, userInfo) {
            setUserInfoInLocalstorage(userInfo)
        },
        setMenuList(state, menuList) {
            setMenuListInLocalstorage([...menuList])
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
        handleLogOut({commit}) {
            return new Promise((resolve) => {
                let token = this.getters.getUserInfo.token
                logout({
                    token
                }).then(res => {
                    commit('setUserInfo', {})
                    commit('setMenuList', [])
                    resolve(config.loginName)
                }).catch(err => {

                })
            })
        }
    }
}