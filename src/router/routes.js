import Home from '../views/Home.vue'
// import Dashboard from '../views/Dashboard.vue'
import Icons from '../views/Icons.vue'
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
import Maps from '../views/Maps.vue'
import Profile from '../views/UserProfile.vue'
import Tables from '../views/Tables.vue'
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
  // {
  //   path: '/dashboard',
  //   name: 'dashboard',
  //   components: { default: Dashboard },
  //   meta: {
  //     requiresAuth: true,
  //   },
  // },
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
    path: '/user',
    name: 'user',
    components: { default: IndexUser },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/user/create',
    name: 'New user',
    components: { default: CreateUser },
    meta: {
      requiresAuth: true,
    },
  },
  {
    path: '/user/edit/:id',
    name: 'Edit user',
    components: { default: EditUser },
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
    path: '/report',
    name: 'report',
    components: { default: Report },
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
