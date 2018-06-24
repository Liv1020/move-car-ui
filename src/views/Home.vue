<style scoped>

</style>

<template>
  <div>{{ status }}</div>
</template>

<script>
  import qrcode from '@/services/qrcode'
  import aliyun from '@/services/aliyun'
  import { Toast } from 'vant'

  export default {
    name: 'Home',
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

        aliyun.sendVoice(this.$route.query['qr']).then((ret) => {
          if (ret.status !== 0) {
            this.status = ret.message
            return
          }

          this.status = '呼叫成功，车主马上来挪车'
        })
      })
    }
  }
</script>
