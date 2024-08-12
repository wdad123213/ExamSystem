import axios from 'axios'
import { message } from 'antd'

// 创建 axios 实例对象
const instance = axios.create({
  baseURL: '/api',
  withCredentials:true
})

// 请求拦截器，统一处理公共参数
instance.interceptors.request.use(config => {
  const token = localStorage.getItem('token')
  if (token && config.url !== '/login') {
    config.headers.Authorization = token
  }
  return config
})

// 响应拦截统一处理错误
instance.interceptors.response.use(response => {
  return response
}, err => {
  console.log(err)
  if (err.response.status === 401) {
    message.error('用户信息失效，请重新登录!')
    setTimeout(() => {
      window.location.href = '/login'
    }, 0)
  }
  return Promise.reject(err)
})

export default instance
