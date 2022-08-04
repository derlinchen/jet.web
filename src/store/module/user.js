import {
    login
} from '@/api/user'

import { setToken, getToken } from '@/libs/util'

export default {
    state: {
        userCode: '',
        userName: '',
        avatarImgPath: '',
        token: getToken()
    },

    mutations: {
        setToken(state, token) {
            state.token = token
            setToken(token)
        }
    },

    getters: {

    },


    actions: {
        handleLogin({ commit }, { userName, password }) {
            userName = userName.trim()
            return new Promise((resolve, reject) => {
                login({
                    userName,
                    password
                }).then(res => {
                    // const data = res.data
                    // commit('setToken', data.token)
                    resolve()
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}