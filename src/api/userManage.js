import request from '@/libs/request'

export const searchUser = (param) => {
    return request.request({
        header: {
            'Content-Type': 'application/json'
        },
        url: '/erp/sysUser/v1/searchSysUser',
        data: param,
        method: 'post'
    })
}

