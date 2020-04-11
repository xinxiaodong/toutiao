import LayoutAside from './home/layout-aside.vue' // 引入左侧导航组件
import LayoutHeader from './home/layout-header.vue' // 引入头部导航组件
import BreadCrumb from './common/bread-crumb.vue' // 引入面包屑组件
export default {
  install (Vue) {
    Vue.component('layout-aside', LayoutAside) // 全局注册
    Vue.component('layout-header', LayoutHeader) // 全局注册
    Vue.component('bread-crumb', BreadCrumb) // 全局注册面包屑组件
  }
}
