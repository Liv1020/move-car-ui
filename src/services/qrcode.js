/**
 * User: Pavle Lee <523260513@qq.com>
 * Date: 2018/6/23
 * Time: 下午6:07
 */
import api from './api'
import config from 'config/config'

class QrCode {
  getByCode(qr) {
    return api.http.get(config.apiHost + '/qrcode/view?qr=' + qr)
  }
}

export default new QrCode()
