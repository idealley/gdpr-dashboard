import Dashboard from '@/components/Dashboard'
import Login from '@/components/Login'
import store from '../vuex/store'

export default [
  {
    path: '/',
    redirect: '/dashboard'
  },
  {
    path: '/dashboard',
    name: 'Dashboard',
    component: Dashboard,
    beforeEnter: (to, from, next) => {
      if (!store.getters.isAuthenticated) next('/login')
      next()
    }
  },
  {
    path: '/login',
    name: 'Login',
    component: Login
  }
]
