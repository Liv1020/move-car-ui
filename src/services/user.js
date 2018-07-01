/**
 * User: Pavle Lee <523260513@qq.com>
 * Date: 2018/6/23
 * Time: 下午9:44
 */
import api from './api'
import config from 'config/config'

class UserService {
  update({ mobile, code, plateNumber, qrCode }) {
    return api.http.post(config.apiHost + '/user/update', { mobile, code, 'plate_number': plateNumber, 'qr_code': qrCode })
  }

  isSubscribe() {
    return api.http.post(config.apiHost + '/user/is-subscribe')
  }

  confirm({ wait }) {
    return api.http.post(config.apiHost + '/user/confirm', { wait })
  }
}

export default new UserService()
