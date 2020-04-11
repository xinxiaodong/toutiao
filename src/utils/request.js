// 对axios进行的一个封装
import axios from 'axios'
import router from '../router' // 路由对象实例引入
import { Message } from 'element-ui' // 引入提示对象
// 请求拦截器
axios.defaults.baseURL = 'http://ttapi.research.itcast.cn/mp/v1_0' // 赋值黑马头条的默认地址

axios.interceptors.request.use(function (config) {
  // 执行请求成功
  // config 是axios的所有配置
  const token = window.localStorage.getItem('user-token') // 获取token
  config.headers.Authorization = `Bearer ${token}` // 统一注入token
  return config // 返回的config就会作为新的请求选项去进行请求
}, function () {
  // 执行请求失败
})
// 响应拦截器
axios.interceptors.response.use(function (response) {
  // 成功时执行
  return response.data ? response.data : {} // 解决当data不存在时 then中读取数据报错问题
}, function (error) {
  // 失败时执行 状态码不是200 201或204
  // 获取状态码 => 根据状态码  进行相应的提示或操作
  const status = error.response.status // 获取状态码
  let message = '' // 提示信息
  switch (status) {
    case 400:
      message = '手机号或者验证码错误'
      break
    case 403:
      message = '403 refresh_token未携带或已过期'
      router.push('/login') // this.$router.push()
      break
    case 507:
      message = '服务器数据库异常'
      break
    case 401:
      message = 'token过期或未出'
      window.localStorage.clear() // 清空缓存
      router.push('/login') // this.$router.push()
      break
    case 404:
      message = '手机号不正确'
      break
    default:
      break
  }
  // 状态码提示
  Message({ type: 'waring', message: message })
})
export default axios
