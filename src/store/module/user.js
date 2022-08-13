import {
    login
} from '@/api/user'

import { setToken, getToken } from '@/libs/util'

export default {
    state: {
        userCode: '',
        userName: '',
        avatarImgPath: '',
        menuList:[],
        token: getToken()
    },

    mutations: {
        setToken(state, token) {
            state.token = token
            setToken(token)
        },
        setMenuList(state, menuList) {
            state.menuList = menuList
        }
    },

    getters: {

    },


    actions: {
        handleLogin({ commit }, { userCode, password }) {
            userCode = userCode.trim()
            return new Promise((resolve, reject) => {
                login({
                    userCode,
                    password
                }).then(res => {
                    const data = res.data
                    commit('setToken', data.token)
                    commit('setMenuList', data.menuList)
                    const defaultRoute = data.menuList[0].url
                    resolve(defaultRoute)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}