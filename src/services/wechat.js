/**
 * User: Pavle Lee <523260513@qq.com>
 * Date: 2018/6/26
 * Time: 下午7:40
 */

import api from './api'
import config from 'config/config'
import wx from 'weixin-js-sdk'

class Wechat {
  constructor() {
    const self = this
    self.sdk = null
    api.http.get(config.apiHost + '/js/config').then((ret) => {
      if (ret.status !== 0) {
        console.log(ret.message)
        return
      }

      const params = Object.assign({ debug: true, jsApiList: ['scanQRCode'] }, ret.data)
      self.sdk = wx.config(params);
    })
  }
}

export default new Wechat()
