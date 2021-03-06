import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '@/views/Register'
import Home from '@/views/Home'
import Qrcode from '@/views/Qrcode'
import Subscribe from '@/views/Subscribe'
import Confirm from '@/views/Confirm'
import Success from '@/views/Success'
import User from '@/views/User'
import VueCookie from 'vue-cookie'
import oauth from '@/services/oauth'
import { Toast } from 'vant'

Vue.use(VueRouter)

const routes = [
  { path: '/home', component: Home },
  { path: '/register', component: Register },
  { path: '/qrcode', component: Qrcode },
  { path: '/subscribe', component: Subscribe },
  { path: '/confirm', component: Confirm },
  { path: '/success', component: Success },
  { path: '/user', component: User }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  if (to.path === '/qrcode') {
    next()
    return
  }

  if (VueCookie.get('token') === null) {
    if (to.query['code'] === undefined) {
      window.location.href = oauth.getRedirectUrl()
      return
    }

    oauth.getUserByCode(to.query['code']).then((ret) => {
      if (ret.status !== 0) {
        Toast(ret.message)
        return
      }

      const expires = new Date(ret.data.expired_at * 1000)
      VueCookie.set('token', ret.data.token, { expires: expires })
      VueCookie.set('user', JSON.stringify(ret.data.user), { expires: expires })
      next()
    })
  } else {
    next()
  }
})

export default router;
