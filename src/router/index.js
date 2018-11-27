import Vue from 'vue'
import Router from 'vue-router'

const Home = () => import('../components/Home.vue')
const Admin = () => import('../components/Admin.vue')
const userEdit = () => import('../components/userEdit.vue')
const uploadPage = () => import('../components/uploadPage.vue')
const manage = () => import('../components/manage.vue')
const upload = () => import('../components/upload.vue')
const career = () => import('../components/career.vue')

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/jifen',
      name: 'home',
      meta: {
        title: '素人种草'
      },
      component: Home
    },{
      path: '/admin',
      name: 'Admin',
      meta: {
        title: '悦嘉丽活动平台'
      },
      component: Admin
    },{
      path: '/userEdit',
      name: 'userEdit',
      meta: {
        title: '素人种草'
      },
      component: userEdit
    },{
      path: '/uploadPage',
      name: 'uploadPage',
      meta: {
        title: '素人种草'
      },
      component: uploadPage
    },{
      path: '/manage',
      name: 'manage',
      meta: {
        title: '悦嘉丽活动平台'
      },
      component: manage
    },{
      path: '/upload',
      name: 'upload',
      meta: {
        title: '素人种草'
      },
      component: upload
    },,{
      path: '/career',
      name: 'career',
      meta: {
        title: '创业测试'
      },
      component: career
    }
  ]
})
