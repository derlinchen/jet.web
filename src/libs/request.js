import axios from 'axios'
import { Message } from 'view-ui-plus';
import store from '@/store'

const request = axios.create({
    // 配置请求超时时间
    timeout: 10000
});

request.interceptors.request.use(config => {
    // 自定义header，可添加项目token
    let userInfo = store.getters.getUserInfo
    config.headers.userCode = userInfo.userCode
    config.headers.userName = encodeURIComponent(userInfo.userName)
    config.headers.token = userInfo.toekn
    return config
});

// 返回拦截
request.interceptors.response.use((response) => {
    const res = response.data;
    if (res.code === '200') {
        return res;
    } else {
        Message.error(res.message)
    }
}, (error) => {
    Message.error('网络连接错误')
    return Promise.reject(error)
});


export default request
