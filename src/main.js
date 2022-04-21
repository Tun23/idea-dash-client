import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import validate from './plugins/validate'
import axios from './plugins/axios'
import Dashboard from './plugins/dashboard'
import Notifications from '@kyvg/vue3-notification'
import 'element-plus/lib/theme-chalk/index.css'
import DashboardLayout from './layout/DashboardLayout.vue'
import AuthLayout from './layout/AuthLayout.vue'

const appInstance = createApp(App)
appInstance.use(router)
appInstance.use(Dashboard)
appInstance.use(store)
appInstance.use(validate)
appInstance.use(axios)
appInstance.use(Notifications)
appInstance.component('default-layout', DashboardLayout)
appInstance.component('auth-layout', AuthLayout)
appInstance.mount('#app')
