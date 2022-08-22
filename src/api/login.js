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



