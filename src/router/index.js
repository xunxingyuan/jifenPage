import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Admin from '@/components/Admin'
import userEdit from '@/components/userEdit'
import uploadPage from '@/components/uploadPage'
import manage from '@/components/manage'
import upload from '@/components/upload'

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
    },{
      path: '/uploadPage',
      name: 'uploadPage',
      component: uploadPage
    },{
      path: '/manage',
      name: 'manage',
      component: manage
    },{
      path: '/upload',
      name: 'upload',
      component: upload
    }
  ]
})
