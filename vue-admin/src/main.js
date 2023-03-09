import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element.js'
// 导入字体图标
import './assets/css/fonts/iconfont.css'
import global_variable from "@/components/global_variable";

Vue.prototype.global = global_variable
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
