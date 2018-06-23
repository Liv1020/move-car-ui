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
        <van-button slot="button" size="small" type="primary">获取验证码</van-button>
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
        v-model="form.plate"
        label="车牌号"
        placeholder="输入车牌号"
      >
      </van-field>
      <van-cell value="您是否已领取挪车静电贴二维码？">
        <template slot>
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
  import { Swipe, SwipeItem, CellGroup, Field, Button, Cell } from 'vant'
  import api from '@/services/api'

  export default {
    name: 'Home',
    components: {
      [Swipe.name]: Swipe,
      [SwipeItem.name]: SwipeItem,
      [CellGroup.name]: CellGroup,
      [Field.name]: Field,
      [Button.name]: Button,
      [Cell.name]: Cell
    },
    data() {
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
          plate: ''
        }
      }
    },
    methods: {
      submit() {
        this.$http.post(api.getUrl('/user/create'), JSON.stringify(this.form), { emulateJSON: true }).then((ret) => {
          console.log(ret)
        })
      }
    }
  }
</script>
