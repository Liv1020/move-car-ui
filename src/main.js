import Vue from 'vue'
import App from './App.vue'
import router from '@/routers/router'
import { Lazyload } from 'vant'
import VueCookie from 'vue-cookie'

Vue.use(Lazyload)
Vue.use(VueCookie)

new Vue({
  el: '#app',
  render: h => h(App),
  router
});
