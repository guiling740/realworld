import axios from 'axios'
const request = axios.create({
    baseURL: 'https://conduit.productionready.io/'
})
// 请求拦截器中做一些公共的业务处理，例如统一设置
request.interceptors.request.use((config) => {
    // 请求经过这里
    config.headers.Authorization = `Token `
    return config
}, error => {
    return Promise.reject(error)
})
export default request