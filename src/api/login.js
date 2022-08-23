import request from '@/libs/request'

export const login = ({ userCode, password }) => {
    const param = {
        'userCode': userCode,
        'password': password
    }

    return request.request({
        header: {
            'Content-Type': 'application/json'
        },
        url: '/erp/sysUser/v1/login',
        data: param,
        method: 'post'
    })
}


export const logout = ({ token }) => {
    const param = {
        'token': token
    }

    return request.request({
        header: {
            'Content-Type': 'application/json'
        },
        url: '/erp/sysUser/v1/logout',
        data: param,
        method: 'post'
    })
}


export const editPassword = (param) => {
    return request.request({
        header: {
            'Content-Type': 'application/json'
        },
        url: '/erp/sysUser/v1/editPassword',
        data: param,
        method: 'post'
    })
}


