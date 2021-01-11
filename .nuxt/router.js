import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from '@nuxt/ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _7dbbe804 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _4d895f8e = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _4e66ff4f = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _29cb380f = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _be484b06 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _71ed0e47 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _10957b5c = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

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
    component: _7dbbe804,
    children: [{
      path: "",
      component: _4d895f8e,
      name: "home"
    }, {
      path: "/login",
      component: _4e66ff4f,
      name: "login"
    }, {
      path: "/register",
      component: _4e66ff4f,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _29cb380f,
      name: "profile"
    }, {
      path: "/settings",
      component: _be484b06,
      name: "settings"
    }, {
      path: "/editor",
      component: _71ed0e47,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _10957b5c,
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
