import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '@/views/Home'
import VueCookie from 'vue-cookie'
import oauth from '@/services/oauth'

Vue.use(VueRouter)

const routes = [
  { path: '/register', component: Home }
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
        // window.location.href = oauth.getRedirectUrl()
        return
      }

      VueCookie.set('token', ret.data.token, ret.data.expires_in)
      VueCookie.set('user', ret.data.user, ret.data.expires_in)
      next()
    })
  } else {
    next()
  }
})

export default router;
