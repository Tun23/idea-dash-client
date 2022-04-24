import Home from '../views/Home.vue'
import Dashboard from '../views/Dashboard.vue'
import Icons from '../views/Icons.vue'
import IndexDepartment from '../views/department/Index.vue'
import CreateDepartment from '../views/department/Create.vue'
import EditDepartment from '../views/department/Edit.vue'
import IndexCategory from '../views/category/Index.vue'
import EditCategory from '../views/category/Edit.vue'
import CreateCategory from '../views/category/Create.vue'
import Maps from '../views/Maps.vue'
import Profile from '../views/UserProfile.vue'
import Tables from '../views/Tables.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

export default [
  {
    path: '/',
    name: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    components: { default: Home },
    meta: {
      requiresAuth: true,
    },
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
    path: '/department',
    name: 'department',
    components: { default: IndexDepartment },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/department/create',
    name: 'New department',
    components: { default: CreateDepartment },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/department/edit/:id',
    name: 'Edit department',
    components: { default: EditDepartment },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/category',
    name: 'category',
    components: { default: IndexCategory },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/category/create',
    name: 'New category',
    components: { default: CreateCategory },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/category/edit/:id',
    name: 'Edit category',
    components: { default: EditCategory },
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
