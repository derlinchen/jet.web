import request from '@/libs/request'

export const searchSysUser = (param) => {
    return request.request({
        header: {
            'Content-Type': 'application/json'
        },
        url: '/erp/sysUser/v1/searchSysUser',
        data: param,
        method: 'post'
    })
}

export const deleteSysUser = (param) => {
    return request.request({
        url:'/erp/sysUser/v1/deleteSysUser',
        params: param,
        method: 'delete'
    })
}

export const deleteSysUsers = (param) => {
    return request.request({
        url:'/erp/sysUser/v1/deleteSysUsers',
        data: param,
        method: 'delete'
    })
}

