import request from '@/libs/request'

export const getSysRoleSelect = (param) => {
    return request.request({
        header: {
            'Content-Type': 'application/json'
        },
        url: '/erp/sysRole/v1/getSysRoleList',
        data: {},
        method: 'post'
    })
}

export const searchSysRole = (param) => {
    return request.request({
        header: {
            'Content-Type': 'application/json'
        },
        url: '/erp/sysRole/v1/searchSysRole',
        data: param,
        method: 'post'
    })
}

export const deleteSysRole = (param) => {
    return request.request({
        url: '/erp/sysRole/v1/deleteSysRole',
        params: param,
        method: 'delete'
    })
}

export const saveSysRole = (param) => {
    return request.request({
        header: {
            'Content-Type': 'application/json'
        },
        url: '/erp/sysRole/v1/saveSysRole',
        data: param,
        method: 'post'
    })
}


export const updateSysRole = (param) => {
    return request.request({
        header: {
            'Content-Type': 'application/json'
        },
        url: '/erp/sysRole/v1/updateSysRole',
        data: param,
        method: 'post'
    })
}

export const deleteSysRoles = (param) => {
    return request.request({
        url: '/erp/sysRole/v1/deleteSysRoles',
        data: param,
        method: 'delete'
    })
}

export const bindMenus = (param) => {
    return request.request({
        url: '/erp/sysRole/v1/bindMenus',
        data: param,
        method: 'post'
    })
}