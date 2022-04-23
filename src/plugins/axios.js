import _axios from 'axios'

_axios.defaults.baseURL = import.meta.env.VITE_API_URL
const axios = _axios.create()
export { axios }
export default {
  install(app) {
    app.config.globalProperties.$axios = axios
  },
}
