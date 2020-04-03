import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import ElementUI from 'element-ui' // 引入包
import 'element-ui/lib/theme-chalk/index.css' // 引入样式
import './styles/index.less' // 引入初始化样式

Vue.use(ElementUI) // 注册elementui

Vue.config.productionTip = false
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 赋值黑马头条的默认地址
Vue.prototype.$axios = axios // 赋值给全局对象
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
