import {
    login
} from '@/api/user'

import { setToken, getToken, setMenuListInLocalstorage,} from '@/libs/util'

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
        setUserCode(state, userCode) {
            state.userCode = userCode
        },
        setUserName(state, userName) {
            state.userName = userName
        },
        setMenuList(state, menuList) {
            state.menuList = menuList
        }
    },

    getters: {
        getMenuList(state) {
            return state.menuList
        }
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
                    commit('setUserCode', data.userCode)
                    commit('setUserName', data.userName)
                    setMenuListInLocalstorage([...data.menuList])
                    const defaultRoute = data.menuList[0].url
                    resolve(defaultRoute)
                }).catch(err => {
                    reject(err)
                })
            })
        }
    }
}