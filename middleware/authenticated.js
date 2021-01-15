/**
 * 验证是否登录的中间件
 * 前后端都可以拦截，nuxt.js中独有的方式
 */
export default function ({ store, redirect }) {
  // 未验证
  if (!store.state.user) {
    return redirect('/login')
  }
}