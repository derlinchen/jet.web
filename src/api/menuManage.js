import request from '@/libs/request'

export const getSysMenuTree = (param) => {
    return request.request({
        header: {
            'Content-Type': 'application/json'
        },
        url: '/erp/sysMenu/v1/getSysMenuTree',
        data: param,
        method: 'post'
    })
}

export const getSysMenuList = (param)=> {
    return request.request({
        header: {
            'Content-Type': 'application/json'
        },
        url: '/erp/sysMenu/v1/getSysMenuList',
        data: param,
        method: 'post'
    })
}


export const deleteSysMenu = (param) => {
    return request.request({
        url: '/erp/sysMenu/v1/deleteSysMenuItem',
        data: param,
        method: 'delete'
    })
}

export const getSysMenu = (param) => {
    return request.request({
        url: '/erp/sysMenu/v1/getSysMenu',
        params: param,
        method: 'get'
    })
}


export const getSysMenuSelect = (param)=> {
    return request.request({
        header: {
            'Content-Type': 'application/json'
        },
        url: '/erp/sysMenu/v1/getSysMenuSelect',
        method: 'post'
    })
}


export const updateSysMenu = (param) => {
    return request.request({
        header: {
            'Content-Type': 'application/json'
        },
        url: '/erp/sysMenu/v1/updateSysMenu',
        data: param,
        method: 'post'
    })
}

export const saveSysMenu = (param) => {
    return request.request({
        header: {
            'Content-Type': 'application/json'
        },
        url: '/erp/sysMenu/v1/saveSysMenu',
        data: param,
        method: 'post'
    })
}
