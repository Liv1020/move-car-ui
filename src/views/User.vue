<style scoped>

</style>

<template>
  <div>
    <table>
      <thead>
      <tr>
        <th>昵称</th>
        <th>手机</th>
        <th>城市</th>
        <th>车牌号</th>
      </tr>
      </thead>
      <tbody>

      <tr v-for="item in list.data">
        <td>{{ item.nickname }}</td>
        <td>{{ item.mobile }}</td>
        <td>{{ item.city }}</td>
        <td>{{ item.plate_number }}</td>
      </tr>

      </tbody>
    </table>
  </div>
</template>

<script>
  import user from '@/services/user'
  import { Toast } from 'vant'

  export default {
    name: 'user',
    data() {
      return {
        list: {
          data: [],
          total: 0
        }
      }
    },
    created() {
      this.load()
    },
    methods: {
      load() {
        user.search().then((ret) => {
          if (ret.status !== 0) {
            Toast(ret.message)
            return
          }

          this.list.data = ret.data.data
          this.list.total = ret.data.total
        })
      }
    }
  }
</script>
