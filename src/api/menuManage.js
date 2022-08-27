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
