import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Redirect from '@/components/Redirect'
import Test from '@/components/Test'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
     path: '/:slug',
     name: 'RedirectURL',
     component: Redirect,
     props: true
   },
   {
     path: '*',
     name: 'Redirect',
     redirect: '/'
   }

  ]
})
