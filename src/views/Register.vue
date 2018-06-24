<style scoped>
  img {
    width: 100%;
    height: 240px;
    display: block;
    padding: 30px 60px;
    box-sizing: border-box;
    background-color: #fff;
    pointer-events: none;
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
        <img v-lazy="image" >
      </van-swipe-item>
    </van-swipe>
    <van-cell-group>
      <van-field
        center
        clearable
        v-model="form.mobile"
        label="手机号"
        placeholder="输入手机号码"
      >
        <van-button slot="button" size="small" type="primary" @click="sendCode">获取验证码</van-button>
      </van-field>
      <van-field
        center
        clearable
        v-model="form.code"
        label="验证码"
        placeholder="输入验证码"
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
          <div>您是否已领取挪车静电贴二维码？</div>
          <div>
            <van-button type="primary" size="large" class="btn-scan-qr">
              [已领取，请点击扫描静电贴二维码]
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
  import VueQrcode from '@xkeshi/vue-qrcode';
  import user from '@/services/user';
  import aliyun from '@/services/aliyun';

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
    data() {
      const qrId = this.$route.query['qr']
      return {
        images: [
          'https://img.yzcdn.cn/public_files/2017/09/05/3bd347e44233a868c99cf0fe560232be.jpg',
          'https://img.yzcdn.cn/public_files/2017/09/05/c0dab461920687911536621b345a0bc9.jpg',
          'https://img.yzcdn.cn/public_files/2017/09/05/4e3ea0898b1c2c416eec8c11c5360833.jpg',
          'https://img.yzcdn.cn/public_files/2017/09/05/fd08f07665ed67d50e11b32a21ce0682.jpg'
        ],
        form: {
          mobile: '',
          code: '',
          plateNumber: '',
          qrCode: qrId,
          qrUrl: 'http://mc.liv1020.com:8010/home?qr=' + qrId
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

          alert('注册成功')
        })
      },

      sendCode() {
        if (this.form.mobile === '') {
          Toast('手机号码不能为空')
          return
        }

        aliyun.sendCode(this.form.mobile).then((ret) => {
          if (ret.status !== 0) {
            Toast(ret.message)
            return
          }

          alert('发送成功')
        })
      }
    }
  }
</script>
