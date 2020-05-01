import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/home'
import Login from '../views/login'
import Home2 from '../views/home/home.vue' // 默认背景
// import Comment from '../views/comment'
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
    }, {
      // 二级路由表 评论列表
      path: 'comment', // 完整地址 相对地址
      component: () => import('../views/comment') // 按需加载
    },
    {
      // 二级路由表 素材管理
      path: 'material',
      component: () => import('../views/material') // 按需加载
    },
    {
      // 二级路由列表
      path: 'articles',
      component: () => import('../views/articles') // 按需加载
    },
    {
      // 发布文章
      path: 'publish',
      component: () => import('../views/publish') // 按需加载
    },
    {
      path: 'publish/:articleId', // 定义动态路由参数 此规则之匹配修改文章
      component: () => import('../views/publish')
    }, {
      // 账户信息
      path: 'account',
      component: () => import('../views/account')
    }
    ]
  },
  {
  // 登录页
    path: '/login',
    name: 'Login',
    component: Login
  },
  {
    path: '*', // 匹配任何地址 但是如果其他的可以匹配 优先匹配其他 否则匹配该组件
    component: () => import('../views/404') // 配置404页面
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
