import Vue from 'vue'
import router from './router';
import store from './store'
import i18n from './locales'
import App from './App.vue'
import axios from 'axios';
import VueAxios from 'vue-axios'

import {setupLan} from './locales/index.js' //引入i18n修改语言的方法
Vue.prototype.setLanguage = setupLan;
import './icons'
import './assets/css/index.css'
axios.defaults.timeout = 10000;   // 默认接口超时时间1min
Vue.config.productionTip = false
Vue.prototype.IP = process.env.VUE_APP_BASE_URL;
Vue.use(VueAxios, axios)
//  请求拦截器
axios.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json"
    config.headers["Accept"] = "*/*"
    let token = sessionStorage.getItem('access_token') || null
    if (token) {
      // 如果token不为null，否则传token给后台
      config.headers["Authorization"] = `Bearer ${token}`; //请求头加上token
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

// 响应拦截器
axios.interceptors.response.use(
  (response) => {
    const res = response
    //届时根据后端返回success或者code值判断
    if (res.success === true) {
      return res
    } else {
      return res
    }
  },
  (error) => {
    //响应错误
    return Promise.reject(error)
  }
)

new Vue({
  router,
  store,
  i18n,
  render: h => h(App),
}).$mount('#app')
