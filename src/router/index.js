import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login'
import Home2 from '../views/home/home.vue' // 默认背景
Vue.use(VueRouter)

const routes = [
  {
    // 强制跳转
    path: '/',
    redirect: '/home'
  },
  {
  // 主页
    path: '/home',
    name: 'Home',
    component: Home,
    children: [{
      path: '', // 二级路由 什么都不写 作为显示组件
      component: Home2
    }]
  },
  {
  // 登录页
    path: '/login',
    name: 'Login',
    component: Login
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = new VueRouter({
  routes
})

export default router
