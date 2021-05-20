import Vue from 'vue'
import App from './App.vue'
import router from "./router/index"
import store from "./store/index"
import Element from "element-ui"
import 'element-ui/lib/theme-chalk/index.css';
// 引入封装的axios,并写入vue原型
import request from "./utils/request.js"
// import ver  from "./utils/verify.js"
Vue.prototype.$request = request;
// Vue.prototype.$ver = ver

Vue.config.productionTip = false

Vue.use(Element);
new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
