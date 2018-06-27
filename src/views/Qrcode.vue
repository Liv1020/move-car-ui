<style scoped>

</style>

<template>
  <div>
    <div v-for="item in items" style="float: left; padding: 15px">
      <qrcode :value="item.url" :options="{ size: 200 }"></qrcode>
      <div style="text-align: center">{{ item.code }}</div>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'vant'
  import VueQrcode from '@xkeshi/vue-qrcode';
  import qrcode from '@/services/qrcode';

  export default {
    name: 'Qrcode',
    components: {
      [Toast.name]: Toast,
      [VueQrcode.name]: VueQrcode
    },
    data() {
      return {
        items: []
      }
    },
    created() {
      for (var i = 0; i < 200; i++) {
        qrcode.create().then((ret) => {
          if (ret.status !== 0) {
            Toast(ret.message)
            return
          }

          this.items.push({
            url: qrcode.getQrcodeUrl(ret.data.id),
            code: ret.data.id
          })
        })
      }
    }
  }
</script>
