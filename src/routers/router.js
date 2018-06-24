import Vue from 'vue'
import VueRouter from 'vue-router'
import Register from '@/views/Register'
import Home from '@/views/Home'
import Qrcode from '@/views/Qrcode'
import VueCookie from 'vue-cookie'
import oauth from '@/services/oauth'

Vue.use(VueRouter)

const routes = [
  { path: '/home', component: Home },
  { path: '/register', component: Register },
  { path: '/qrcode', component: Qrcode }
];

const router = new VueRouter({
  mode: 'history',
  routes
});

router.beforeEach((to, from, next) => {
  if (VueCookie.get('token') === null) {
    if (to.query['code'] === undefined) {
      window.location.href = oauth.getRedirectUrl()
      return
    }

    oauth.getUserByCode(to.query['code']).then((ret) => {
      if (ret.status !== 0) {
        window.location.href = oauth.getRedirectUrl()
        return
      }

      const expires = new Date(ret.data.expired_at * 1000)
      VueCookie.set('token', ret.data.token, expires.toGMTString())
      VueCookie.set('user', ret.data.user, expires.toGMTString())
      next()
    })
  } else {
    next()
  }
})

export default router;
