<style scoped>
  .swipe-image {
    width: 100%;
    height: 240px;
  }
  .btn-scan-qr {
    width: 100%;
    height: 120px;
  }
</style>

<template>
  <div id="home">
    <van-swipe :autoplay="3000">
      <van-swipe-item v-for="(image, index) in images" :key="index">
        <img class="swipe-image" v-lazy="image" >
      </van-swipe-item>
    </van-swipe>
    <van-cell-group>
      <van-field
        center
        clearable
        v-model="form.mobile"
        label="手机号"
        placeholder="输入手机号码"
        type="number"
      >
        <van-button slot="button" size="small" type="primary" @click="sendCode" :disabled="this.send.disable">
          <span v-if="this.send.disable">{{ send.second }} s</span>
          <span v-else>获取验证码</span>
        </van-button>
      </van-field>
      <van-field
        center
        clearable
        v-model="form.code"
        label="验证码"
        placeholder="输入验证码"
        type="number"
      >
      </van-field>
      <van-field
        center
        clearable
        v-model="form.plateNumber"
        label="车牌号"
        placeholder="输入车牌号"
      >
      </van-field>
      <van-cell>
        <template slot v-if="form.qrCode !== undefined">
          <qrcode :value="form.qrUrl" :options="{ size: 200 }"></qrcode>
        </template>
        <template slot v-else>
          <div>您是否已领取挪车二维码？</div>
          <div>
            <van-button type="primary" size="large" class="btn-scan-qr" @click="scan">
              [已领取，请点击扫描二维码]
            </van-button>
          </div>
        </template>
      </van-cell>
      <van-cell>
        <van-button type="primary" size="large" @click="submit">
          确定注册
        </van-button>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
  import { Swipe, SwipeItem, CellGroup, Field, Button, Cell, Toast } from 'vant'
  import VueQrcode from '@xkeshi/vue-qrcode'
  import user from '@/services/user'
  import aliyun from '@/services/aliyun'
  import qrcode from '@/services/qrcode'
  import wechat from '@/services/wechat'
  import wx from 'weixin-js-sdk'

  export default {
    name: 'Register',
    components: {
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [CellGroup.name]: CellGroup,
      [Field.name]: Field,
      [Button.name]: Button,
      [Cell.name]: Cell,
      [VueQrcode.name]: VueQrcode
    },
    created() {
      user.isSubscribe().then((ret) => {
        if (ret.status !== 0) {
          Toast(ret.message)
          return
        }

        if (ret.data.is_subscribe === 0) {
          this.$router.push({ path: '/subscribe' })
        }
      })
    },
    data() {
      const qrId = this.$route.query['qr']
      return {
        images: [
          'static/1.jpeg',
          'static/2.jpeg',
          'static/3.jpeg',
          'static/4.jpeg'
        ],
        form: {
          mobile: '',
          code: '',
          plateNumber: '',
          qrCode: qrId,
          qrUrl: qrcode.getQrcodeUrl(qrId)
        },
        send: {
          disable: false,
          second: 90,
          interval: 0
        }
      }
    },
    methods: {
      submit() {
        user.update(this.form).then((ret) => {
          if (ret.status !== 0) {
            Toast(ret.message)
            return
          }

          this.$router.push({ path: '/success' })
        })
      },

      sendCode() {
        if (this.send.disable) {
          return
        }

        if (this.form.mobile === '') {
          Toast('手机号码不能为空')
          return
        }

        aliyun.sendCode(this.form.mobile).then((ret) => {
          if (ret.status !== 0) {
            Toast(ret.message)
            return
          }

          this.send.disable = true
          this.send.second = 90
          this.send.interval = setInterval(() => {
            this.send.second--
            if (this.send.second === 0) {
              clearInterval(this.send.interval)
              this.send.disable = false
              this.send.second = 90
            }
          }, 1000)
        })
      },
      scan() {
        wechat.sdk().then(() => {
          wx.ready(() => {
            wx.scanQRCode({
              needResult: 1,
              scanType: ['qrCode'],
              success: (res) => {
                const url = new URL(res.resultStr)
                this.form.qrUrl = res.resultStr
                this.form.qrCode = url.searchParams.get('qr')
              }
            })
          })
        })
      }
    }
  }
</script>
