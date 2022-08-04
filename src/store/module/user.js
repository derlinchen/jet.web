import {
    login
} from '@/api/user'

export default {
    state: {
        userCode: '',
        userName: '',
        avatarImgPath: '',
        // token: getToken()
    },

    mutations: {

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