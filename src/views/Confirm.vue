<style scoped>

</style>

<template>
  <div>
    <van-cell-group>
      <van-cell title="请选择前往挪车时间" />
    </van-cell-group>
    <van-radio-group v-model="form.wait">
      <van-cell-group>
        <van-cell v-for="item in items" :key="item.id" :title="item.wait + '分钟'" clickable @click="form.wait = item.wait">
          <van-radio :name="item.wait" />
        </van-cell>
      </van-cell-group>
    </van-radio-group>
    <van-cell-group>
      <van-cell>
        <van-button type="primary" size="large" @click="submit">
          确定
        </van-button>
      </van-cell>
    </van-cell-group>
  </div>
</template>

<script>
  import { RadioGroup, CellGroup, Button, Cell, Toast, Radio } from 'vant'
  import user from '@/services/user'
  import wechat from '@/services/wechat'
  import wx from 'weixin-js-sdk'

  export default {
    name: 'Wait',
    components: {
      [CellGroup.name]: CellGroup,
      [RadioGroup.name]: RadioGroup,
      [Button.name]: Button,
      [Cell.name]: Cell,
      [Radio.name]: Radio
    },
    data() {
      return {
        form: {
          wait: 3
        },
        items: [
          {
            id: 1,
            wait: 3
          },
          {
            id: 2,
            wait: 5
          },
          {
            id: 3,
            wait: 10
          },
          {
            id: 4,
            wait: 15
          },
          {
            id: 4,
            wait: 120
          }
        ]
      }
    },
    methods: {
      submit() {
        user.confirm(this.form).then(() => {
          Toast('提交成功')
          wechat.sdk().then(() => {
            wx.ready(() => {
              wx.closeWindow()
            })
          })
        })
      }
    }
  }
</script>
