import { createStore } from 'vuex'
import { axios } from '../plugins/axios'

export default createStore({
  state: {
    token: null,
    authenticated: false,
    user: null,
    isLoading: false,
    notification: null,
    limit: 5,
    page: 1,
  },
  mutations: {
    setLimit: (state, limit) => (state.limit = limit),
    setPage: (state, page) => (state.page = page),
    setLoading: (state, isLoading) => (state.isLoading = isLoading),
    setNotification: (state, notification) => (state.notification = notification),
    setUser: (state, user) => (state.user = user),
    setAuth: (state, status) => (state.authenticated = status),
    setToken: (state, accessToken) => (state.token = accessToken),
  },
  actions: {
    startLoading({ commit }) {
      commit('setLoading', true)
    },
    stopLoading({ commit }) {
      commit('setLoading', false)
    },
    login({ commit }, data) {
      axios.defaults.headers['Authorization'] = `Bearer ${data.token}`
      commit('setToken', data.token)
      localStorage.setItem('accessToken', data.token)
      delete data.token
      commit('setUser', data)
      commit('setAuth', true)
    },
    logout({ commit }) {
      commit('setAuth', false)
      commit('setUser', null)
      commit('setToken', null)
      localStorage.setItem('accessToken', '')
    },
    fetchAccessToken({ commit }) {
      commit('setToken', localStorage.getItem('accessToken'))
    },
    handleNotifications({ commit }, data) {
      let notification = ''
      if (typeof data.message === 'string') {
        notification = data.message
      } else if (typeof data.message === 'object') {
        notification = data.message.message
      }
      commit('setNotification', {
        text: notification,
        type: data.success ? 'success' : 'error',
      })
    },
    setLimit({ commit }, data) {
      commit('setLimit', data)
    },
    setPage({ commit }, data) {
      commit('setPage', data)
    },
  },
  getters: {},
})
