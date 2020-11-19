import Vue from 'vue'
import router from './router';
import store from './store'
import i18n from './locales'
import App from './App.vue'
import axios from 'axios';
import {setupLan} from './locales/index.js' //引入i18n修改语言的方法
Vue.prototype.setLanguage = setupLan;
import './icons'
import './assets/css/index.css'

Vue.config.productionTip = false
// axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com' //假数据接口
axios.defaults.baseURL = 'http://47.107.241.74:8081'
// axios.defaults.baseURL = 'http://localhost:8081'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
