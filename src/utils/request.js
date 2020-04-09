// 对axios进行的一个封装
import axios from 'axios'
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
export default axios
