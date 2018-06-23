/**
 * User: Pavle Lee <523260513@qq.com>
 * Date: 2018/6/23
 * Time: 下午5:12
 */
import api from './api'
import config from 'config/config'

class Oauth {
  getUserByCode(code) {
    return api.http.post(config.apiHost + '/oauth/code', { code: code })
  }

  getRedirectUrl() {
    return config.apiHost + '/oauth/index'
  }
}

export default new Oauth()
