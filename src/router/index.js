import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Admin from '@/components/Admin'
import userEdit from '@/components/userEdit'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/jifen',
      name: 'home',
      component: Home
    },{
      path: '/admin',
      name: 'Admin',
      component: Admin
    },{
      path: '/userEdit',
      name: 'userEdit',
      component: userEdit
    }
  ]
})
