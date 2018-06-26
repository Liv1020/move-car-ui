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
    return 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + config.appID +
      '&redirect_uri=' + encodeURI(window.location.href) +
      '&response_type=code&scope=snsapi_userinfo' +
      '&state=STATE#wechat_redirect'
  }
}

export default new Oauth()
