import axios from 'axios'
import { Message } from 'element-ui'
import store from '@/store'
// import { getToken } from '@/utils/auth'

// 创建一个axios实例
const service = axios.create({
  baseURL: 'http://localhost:8080/', // url = base url + request url
  // baseURL: 'http://192.168.15.128:8080/',
  // withCredentials: true, // 当跨域请求时发送cookie
  timeout: 5000 // 请求超时时限
})

// 请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做一些事情
    if (store.getters.token) {
      // ['X-Token'] 是自定义头键，根据具体请求修改
      // 每次请求先携带token
      config.headers['Content-Type'] = 'application/json;charset=UTF-8'
      // 拿到vuex中的token
      config.headers['token'] = store.state.user.token
    }
    return config
  },
  error => {
    // 处理请求错误
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// 响应拦截器
service.interceptors.response.use(
  // 响应成功执行的代码
  response => {
    // 剥离一层data 这样可以直接拿到数据
    const res = response.data
    // 状态码不对的情况下的提示信息 响应拦截器在此处已经判断，因此在其它页面请求时无需在对状态码进行判断
    if (res.code !== 200) {
      Message({
        message: '请求出错了！',
        type: 'error',
        duration: 5 * 1000
      })
      // return Promise.reject(new Error(res.message || 'Error'))
    } else {
      // 状态码正确的情况，把数据返回
      return res
    }
  },
  // 响应出错执行的代码
  error => {
    console.log('err' + error) // for debug
    // 请求失败时的信息提示
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
