import request from '@/libs/request'

export const getSysRoleList = (param) => {
    return request.request({
        header: {
            'Content-Type': 'application/json'
        },
        url: '/erp/sysRole/v1/getSysRoleList',
        data: {},
        method: 'post'
    })
}