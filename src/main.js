import Vue from 'vue'
import App from './App.vue'
import axios from 'axios';
import './icons'
import './assets/css/index.css'
import router from './router';

Vue.config.productionTip = false
// axios.defaults.baseURL = 'https://jsonplaceholder.typicode.com' //假数据接口
axios.defaults.baseURL = 'http://localhost:8081'
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
