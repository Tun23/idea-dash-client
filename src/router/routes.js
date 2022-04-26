import Home from '../views/Home.vue'
import IndexDepartment from '../views/department/Index.vue'
import CreateDepartment from '../views/department/Create.vue'
import EditDepartment from '../views/department/Edit.vue'
import IndexUser from '../views/user/Index.vue'
import CreateUser from '../views/user/Create.vue'
import EditUser from '../views/user/Edit.vue'
import IndexIdea from '../views/idea/Index.vue'
import IndexCategory from '../views/category/Index.vue'
import EditCategory from '../views/category/Edit.vue'
import CreateCategory from '../views/category/Create.vue'
import CategoryDetail from '../views/CategoryDetail.vue'
import Report from '../views/Report.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'

export default [
  {
    path: '/',
    name: 'root',
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
    path: '/category/:id',
    name: 'category detail',
    components: { default: CategoryDetail },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/category/:id/ideas',
    name: 'category list idea',
    components: { default: IndexIdea },
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
      isAdmin: true,
    },
  },
  {
    path: '/department/create',
    name: 'New department',
    components: { default: CreateDepartment },
    meta: {
      requiresAuth: true,
      isAdmin: true,
    },
  },
  {
    path: '/department/edit/:id',
    name: 'Edit department',
    components: { default: EditDepartment },
    meta: {
      requiresAuth: true,
      isAdmin: true,
    },
  },
  {
    path: '/user',
    name: 'user',
    components: { default: IndexUser },
    meta: {
      requiresAuth: true,
      isAdmin: true,
    },
  },
  {
    path: '/user/create',
    name: 'New user',
    components: { default: CreateUser },
    meta: {
      requiresAuth: true,
      isAdmin: true,
    },
  },
  {
    path: '/user/edit/:id',
    name: 'Edit user',
    components: { default: EditUser },
    meta: {
      requiresAuth: true,
      isAdmin: true,
    },
  },
  {
    path: '/category',
    name: 'category',
    components: { default: IndexCategory },
    meta: {
      requiresAuth: true,
      isQa: true,
    },
  },
  {
    path: '/category/create',
    name: 'New category',
    components: { default: CreateCategory },
    meta: {
      requiresAuth: true,
      isQa: true,
    },
  },
  {
    path: '/category/edit/:id',
    name: 'Edit category',
    components: { default: EditCategory },
    meta: {
      requiresAuth: true,
      isQa: true,
    },
  },
  {
    path: '/report',
    name: 'report',
    components: { default: Report },
    meta: {
      requiresAuth: true,
      isAdmin: true,
    },
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
