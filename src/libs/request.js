import axios from 'axios'

const request = axios.create({
    // 配置请求超时时间
    timeout: 10000
});

request.interceptors.request.use(config => {
    // 自定义header，可添加项目token
    config.headers.token = 'token';
    return config;
});

// 返回拦截
request.interceptors.response.use((response) => {
    const res = response.data;
    if (res.code === '200') {
        return res;
    }
}, () => {
    alert('请求异常')
});


export default request
