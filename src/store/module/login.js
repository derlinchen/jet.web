import {
    login
} from '@/api/login'

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
        }
    }
}