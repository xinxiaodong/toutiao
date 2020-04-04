import layoutAside from './home/layout-aside.vue' // 引入左侧导航组件
import layoutHeader from './home/layout-header.vue' // 引入头部导航组件
export default {
  install (Vue) {
    Vue.component('layout-aside', layoutAside) // 全局注册
    Vue.component('layout-header', layoutHeader) // 全局注册
  }
}
