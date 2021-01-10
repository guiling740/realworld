import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _fc17e200 = () => interopDefault(import('..\\pages\\layout' /* webpackChunkName: "" */))
const _4bedf396 = () => interopDefault(import('..\\pages\\home' /* webpackChunkName: "" */))
const _675008d3 = () => interopDefault(import('..\\pages\\login' /* webpackChunkName: "" */))
const _a6d01eda = () => interopDefault(import('..\\pages\\profile' /* webpackChunkName: "" */))
const _77a63279 = () => interopDefault(import('..\\pages\\settings' /* webpackChunkName: "" */))
const _76253543 = () => interopDefault(import('..\\pages\\editor' /* webpackChunkName: "" */))
const _d93b9840 = () => interopDefault(import('..\\pages\\article' /* webpackChunkName: "" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/",
    component: _fc17e200,
    children: [{
      path: "",
      component: _4bedf396,
      name: "home"
    }, {
      path: "/login",
      component: _675008d3,
      name: "login"
    }, {
      path: "/register",
      component: _675008d3,
      name: "register"
    }, {
      path: "/profile/:username",
      component: _a6d01eda,
      name: "profile"
    }, {
      path: "/settings",
      component: _77a63279,
      name: "settings"
    }, {
      path: "/editor",
      component: _76253543,
      name: "editor"
    }, {
      path: "/article/:slug",
      component: _d93b9840,
      name: "article"
    }]
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
