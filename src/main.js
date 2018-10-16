// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router/index'
import axios from 'axios'
import { WechatPlugin ,ConfirmPlugin ,ToastPlugin ,LoadingPlugin} from 'vux'
import api from './tools/api'

Vue.use(WechatPlugin)
Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)


FastClick.attach(document.body)

Vue.prototype.$http = axios
Vue.prototype.$api = api
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
