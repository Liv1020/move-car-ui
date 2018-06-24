/**
 * User: Pavle Lee <523260513@qq.com>
 * Date: 2018/6/23
 * Time: 下午6:07
 */
import api from './api'
import config from 'config/config'

class Aliyun {
  sendVoice(qr) {
    return api.http.post(config.apiHost + '/aliyun/call', { qr })
  }
  sendCode(mobile) {
    return api.http.post(config.apiHost + '/aliyun/sms', { mobile })
  }
}

export default new Aliyun()
