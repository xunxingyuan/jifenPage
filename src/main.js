// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import FastClick from 'fastclick'
import App from './App'
import router from './router/index'
import axios from 'axios'
import { WechatPlugin, ConfirmPlugin ,ToastPlugin ,LoadingPlugin} from 'vux'
import api from './tools/api'
import { Pagination, Select,Table,Input,Alert,Option,Button,TableColumn,MessageBox,Message } from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueTouch from 'vue-touch'


Vue.use(VueTouch, {name: 'v-touch'})
Vue.use(require('vue-wechat-title'))
Vue.use(WechatPlugin)
Vue.use(Pagination);
Vue.use(Select);
Vue.use(Table);
Vue.use(Input);
Vue.use(Alert);
Vue.use(Option);
Vue.use(Button);
Vue.use(TableColumn);

Vue.use(ConfirmPlugin)
Vue.use(ToastPlugin)
Vue.use(LoadingPlugin)


Vue.prototype.$confirm = MessageBox.confirm;
Vue.prototype.$message = Message;


FastClick.attach(document.body)

Vue.prototype.$http = axios
Vue.prototype.$api = api
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount('#app-box')
