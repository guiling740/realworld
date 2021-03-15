const cookieParser = process.server ? require('cookieparser') : undefined
// 在服务端渲染期间运行都是同一个实例
// 为了防止数据冲突，务必把state 定义成一个函数，返回数据对象
export const state = () => {
    return {
        // 当前登录用户的登录状态
        user: null
    }
}
export const getters = {
    getUser(state) {
        return state.user
    }
}
export const mutations = {
    setUser(state, data) {
        state.user = data
    },
    /**登出清空用户信息 */
    clearUser(state) {
        state.user = null
    }
}
export const actions = {
    // nuxtServerInit 是一个特殊的action 
    // 这个action 会在服务端渲染期间自动调用
    // 作用：初始化容器数据，传递数据给客户端使用
    /**commit 是提交mutation的对象  req是服务端请求对象 */
    nuxtServerInit({ commit }, { req }) {
        let user = null
        // 如果请求头部有Cookie, 将cookie字符串转换为Javascript对象
        if (req.headers.cookie) {
            const parsed = cookieParser.parse(req.headers.cookie)
            try {
                user = JSON.parse(parsed.user)
            } catch (err) {
                // No valid cookie found
            }
        }
        commit('setUser', user)
    }
}