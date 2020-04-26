import LayoutAside from './home/layout-aside.vue' // 引入左侧导航组件
import LayoutHeader from './home/layout-header.vue' // 引入头部导航组件
import BreadCrumb from './common/bread-crumb.vue' // 引入面包屑组件
import { quillEditor } from 'vue-quill-editor' // 调用富文本编辑器
import 'quill/dist/quill.snow.css' // 富文本编辑器外部引用样式  三种样式三选一引入即可
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.bubble.css'
export default {
  install (Vue) {
    Vue.component('layout-aside', LayoutAside) // 全局注册
    Vue.component('layout-header', LayoutHeader) // 全局注册
    Vue.component('bread-crumb', BreadCrumb) // 全局注册面包屑组件
    Vue.component('quill-editor', quillEditor) // 全局注册富文本编辑器组件
  }
}
