import { createRouter, createWebHistory } from 'vue-router'
import routes from './routes'
import store from '../store/index'
import jwtDecode from 'jwt-decode'
import { axios } from '../plugins/axios'
import UserService from '../services/UserService'

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
  linkActiveClass: 'active',
})
router.beforeEach(async (to, from, next) => {
  const localToken = localStorage.getItem('accessToken')
  const authenticated = store.state.authenticated
  try {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
      if (!authenticated && localToken) {
        const tokenDecode = jwtDecode(localToken)
        if (tokenDecode && tokenDecode.exp && tokenDecode.exp > Date.now() / 1000) {
          axios.defaults.headers['Authorization'] = `Bearer ${localToken}`
          const res = await UserService.getLoginUser(axios)
          if (!res.success) {
            localStorage.setItem('accessToken', '')
            throw 'Invalid token was provided'
          }
          store.commit('setAuth', true)
          store.commit('setUser', res.data)
          store.dispatch('fetchAccessToken')
        } else {
          localStorage.setItem('accessToken', '')
          next({ name: 'login', params: { nextUrl: to.fullPath } })
        }
      }
      if (!authenticated && !localToken) {
        next({ name: 'login', params: { nextUrl: to.fullPath } })
      } else {
        const user = store.state.user
        if (to.matched.some((record) => record.meta.isAdmin)) {
          if (user.role === 1 || user.role === 9) {
            next()
          } else {
            next({ name: 'root' })
          }
        } else if (to.matched.some((record) => record.meta.isQa)) {
          if (user.role === 2 || user.role === 1 || user.role === 9) {
            next()
          } else {
            next({ name: 'root' })
          }
        } else {
          if ((user.role === 1 || user.role === 9) && to.matched.some((record) => record.name === '/')) {
            next({ name: 'Report' })
          } else next()
        }
      }
    } else {
      if (to.matched.some((record) => record.name === 'login' || record.name === 'register') && (authenticated || localToken)) {
        next({ name: 'root', params: { nextUrl: to.fullPath } })
      } else next()
    }
  } catch (err) {
    localStorage.setItem('accessToken', '')
    next({
      name: 'login',
      params: { nextUrl: to.fullPath },
    })
  }
})

export default router
