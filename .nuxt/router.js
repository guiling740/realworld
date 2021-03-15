import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _51af6e23 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _83705bd0 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _0aeab950 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _576f1460 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _460654dc = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _45e09466 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _89da8dc6 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _51af6e23,
    children: [{
      path: "",
      component: _83705bd0,
      name: "home"
    }, {
      path: "/login",
      component: _0aeab950,
      name: "login"
    }, {
      path: "/register",
      component: _0aeab950,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _576f1460,
      name: "profile"
    }, {
      path: "/settings",
      component: _460654dc,
      name: "settings"
    }, {
      path: "/editor",
      component: _45e09466,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _89da8dc6,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config.app && config.app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
