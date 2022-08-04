import axios from 'axios'

export const login = ({userName, password}) => {
    const param = {
        'userName': userName,
        'password': password
    }

    return axios.request({
        url:'/jet/user/login',
        param,
        method:'post'
    })
}



