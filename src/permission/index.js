// 权限拦截 导航守卫
import router from '../router'
import progress from 'nprogress'
import 'nprogress/nprogress.css'
// 全局前置守卫
router.beforeEach(function (to, from, next) {
  progress.start() // 开启进度条
  // 拦截谁 判断拦截地址

  if (to.path.startsWith('/home')) {
    // 进行权限判断 判断有无token如果有token 放过 如果没有 回到登录页
    const token = window.localStorage.getItem('user-token')
    if (token) {
      // 直接放过
      next()
    } else {
      next('/login') // 强制跳转到登录页
    }
  } else {
    next() // 直接放行
  }
})
router.afterEach(function () {
  setTimeout(() => progress.done(), 300)
})
