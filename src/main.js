import Vue from 'vue'
import router from './router';
import store from './store'
import App from './App.vue'
import axios from 'axios';
import './icons'
import './assets/css/index.css'

Vue.config.productionTip = false
// axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com' //假数据接口
axios.defaults.baseURL = 'http://localhost:8081'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
