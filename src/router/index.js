import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('../components/Home.vue')
const Admin = () => import('../components/Admin.vue')
const userEdit = () => import('../components/userEdit.vue')
const uploadPage = () => import('../components/uploadPage.vue')
const manage = () => import('../components/manage.vue')
const upload = () => import('../components/upload.vue')


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
