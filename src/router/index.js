import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/common/Home.vue'
import live from '../view/live/live.vue'
import test from '../components/test/test.vue'
import personal from '../view/personal/personal.vue'
import login from '../view/login/login.vue'
import history from '../view/history/history'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      component: Home,
      children:[
        {
          path: '',
          redirect: 'live'
        },
        {
          path: 'live',
          name: 'live',
          component: live
        },
        {
          path: 'test',
          name: 'test',
          component: test
        },
        {
          path: 'personal',
          name: 'personal',
          component: personal
        },
        {
          path: 'history',
          name: 'history',
          component: history
        }
      ]
    },
    {
      path: '/login',
      name: 'login',
      component: login
    }
  ]
})
