<style scoped>
  .bg {
    background: #fff url(http://www.myliangche.com/img/okbj.jpg) no-repeat left top;
  }
</style>

<template>
  <div class="bg">
    <van-row type="flex" justify="center">
      <van-col span="12" style="margin-top: 18%;">
        <img src="http://www.myliangche.com/img/benren4.png" width="100%">
        <div style="text-align: center">{{ status }}</div>
      </van-col>
    </van-row>
  </div>
</template>

<script>
  import qrcode from '@/services/qrcode'
  import aliyun from '@/services/aliyun'
  import user from '@/services/user'
  import { Toast, Row, Col } from 'vant'

  export default {
    name: 'Home',
    components: {
      [Row.name]: Row,
      [Col.name]: Col
    },
    data() {
      return {
        status: '正在发起呼叫'
      }
    },
    created() {
      if (this.$route.query['qr'] === undefined) {
        Toast('参数错误')
        return
      }

      qrcode.getByCode(this.$route.query['qr']).then((ret) => {
        if (ret.status !== 0) {
          Toast(ret.message)
          return
        }

        if (ret.data.user_id === 0) {
          this.$router.push({ path: '/register', query: { qr: this.$route.query['qr'] }})
          return
        }

        const auth = user.getAuth()
        if (ret.data.user_id === auth.id) {
          this.$router.push({ path: '/success' })
          return
        }

        aliyun.sendVoice(this.$route.query['qr']).then((ret) => {
          if (ret.status !== 0) {
            this.status = ret.message
            return
          }

          this.status = '亲爱的车主，小智已通知车主，请耐心等待'
        })

        const uri = user.getWebSocket(this.$route.query['qr'])
        const ws = new WebSocket(uri)
        ws.onmessage = (e) => {
          const res = JSON.parse(e.data)
          this.status = '亲爱的车主，小智已通知车主，车主' + res.data.wait.value + '分钟之后赶来'
        }
      })
    }
  }
</script>
