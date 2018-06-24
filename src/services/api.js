/**
 * User: Pavle Lee <523260513@qq.com>
 * Date: 2018/6/23
 * Time: 下午1:24
 */
import axios from 'axios'
import VueCookie from 'vue-cookie'

axios.interceptors.request.use(config => {
  console.log(config)
  config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  config.headers['Authorization'] = 'Bearer ' + VueCookie.get('token')

  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  console.log(response)
  if (response.status !== 200) {
    return Promise.reject(response.statusText)
  }

  return response.data
}, error => {
  return Promise.reject(error)
})

export default {
  http: axios
}
