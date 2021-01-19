/**
 * 请求插件
 */
import axios from 'axios'
// 创建请求对象
export const request = axios.create({
  baseURL: 'https://conduit.productionready.io/'
})
/**通过插件机制获取上下午对象(query params req res) */
export default ({ store }) => {
  // 请求拦截器中做一些公共的业务处理，例如统一设置 token
  request.interceptors.request.use((config) => {
    // 请求经过这里
    const { user } = store.state
    if (user && user.token) {
      config.headers.Authorization = `Token ${user.token}`
    }
    // 返回config 请求配置对象
    return config
  }, error => {
    // 如果请求失败 此时请求还没发出去，就会进入这里
    return Promise.reject(error)
  })
}
