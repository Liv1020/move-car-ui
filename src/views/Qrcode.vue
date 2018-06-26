<style scoped>

</style>

<template>
  <div v-if="url === ''">
    正在生成二维码
  </div>
  <div v-else>
    <qrcode :value="url" :options="{ size: 200 }"></qrcode>
  </div>
</template>

<script>
  import { Toast } from 'vant'
  import VueQrcode from '@xkeshi/vue-qrcode';
  import qrcode from '@/services/qrcode';
  import config from 'config/config';

  export default {
    name: 'Qrcode',
    components: {
      [Toast.name]: Toast,
      [VueQrcode.name]: VueQrcode
    },
    data() {
      return {
        url: ''
      }
    },
    created() {
      qrcode.create().then((ret) => {
        if (ret.status !== 0) {
          Toast(ret.message)
          return
        }

        this.url = config.host + '/home?qr=' + ret.data.id
      })
    }
  }
</script>
