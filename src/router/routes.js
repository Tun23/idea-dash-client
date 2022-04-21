import Dashboard from '../views/Dashboard.vue'
import Icons from '../views/Icons.vue'
import Maps from '../views/Maps.vue'
import Profile from '../views/UserProfile.vue'
import Tables from '../views/Tables.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

export default [
  {
    path: '/',
    name: 'root',
    redirect: '/dashboard',
  },
  {
    path: '/dashboard',
    name: 'dashboard',
    components: { default: Dashboard },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/icons',
    name: 'icons',
    components: { default: Icons },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/maps',
    name: 'maps',
    components: { default: Maps },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/profile',
    name: 'profile',
    components: { default: Profile },
  },
  {
    path: '/tables',
    name: 'tables',
    components: { default: Tables },
  },
  {
    path: '/login',
    name: 'login',
    components: { default: Login },
    meta: { layout: 'auth' },
  },
  {
    path: '/register',
    name: 'register',
    components: { default: Register },
    meta: { layout: 'auth' },
  },
]
