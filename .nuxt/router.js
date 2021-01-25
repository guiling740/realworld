import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _a8f43402 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _4fd290f4 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _aa905418 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _957e0d18 = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _f7c37490 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _c091e77c = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _c7e9867e = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _a8f43402,
    children: [{
      path: "",
      component: _4fd290f4,
      name: "home"
    }, {
      path: "/login",
      component: _aa905418,
      name: "login"
    }, {
      path: "/register",
      component: _aa905418,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _957e0d18,
      name: "profile"
    }, {
      path: "/settings",
      component: _f7c37490,
      name: "settings"
    }, {
      path: "/editor",
      component: _c091e77c,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _c7e9867e,
      name: "article"
    }]
  }],

  fallback: false
}

function decodeObj(obj) {
  for (const key in obj) {
    if (typeof obj[key] === 'string') {
      obj[key] = decode(obj[key])
    }
  }
}

export function createRouter () {
  const router = new Router(routerOptions)

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    const r = resolve(to, current, append)
    if (r && r.resolved && r.resolved.query) {
      decodeObj(r.resolved.query)
    }
    return r
  }

  return router
}
