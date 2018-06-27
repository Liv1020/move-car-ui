/**
 * User: Pavle Lee <523260513@qq.com>
 * Date: 2018/6/26
 * Time: 下午7:40
 */

import api from './api'
import config from 'config/config'
import wx from 'weixin-js-sdk'

class Wechat {
  sdk() {
    return api.http.get(config.apiHost + '/js/config').then((ret) => {
      if (ret.status !== 0) {
        alert(ret.message)
        return
      }

      const params = Object.assign({ debug: false, jsApiList: ['scanQRCode'] }, ret.data)
      wx.config(params);
    })
  }
}

export default new Wechat()
