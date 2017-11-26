import Vue from 'vue'
import Router from 'vue-router'
// import store from '../vuex/store'
import routes from './routes'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  saveScrollPosition: true,
  linkActiveClass: 'active',
  routes
})

export default router
