import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/common/Home.vue'
import live from '../view/live/live.vue'
import now from '../view/live/now.vue'
import test from '../components/test/test.vue'
import personal from '../view/personal/personal.vue'
import login from '../view/login/login.vue'
import history from '../view/history/history'
import userInfo from "../view/InfoList/userInfo.vue"
import deviceInfo from "../view/InfoList/DeviceInfo.vue"
import search from "../view/search/search.vue"
import secret from "../view/secret/secret.vue"
import face from "../view/face/face.vue"


Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/index',
      component: Home,
      children:[
        {
          path: '',
          redirect: 'live'
        },
        {
          path: '/live',
          name: 'live',
          component: live
        },
        {
          path: '/now',
          name: 'now',
          component: now
        },
        {
          path: '/userInfo',
          component: userInfo
        },
        {
          path: '/deviceInfo',
          component: deviceInfo
        },
        {
          path: '/test',
          name: 'test',
          component: test
        },
        {
          path: '/personal/:name',
          name: 'personal',
          component: personal
        },
        {
          path: '/history',
          name: 'history',
          component: history
        },
        {
          path: '/search',
          name: 'search',
          component: search,
        },
        {
          path: '/sm',
          name: 'sm',
          component: secret,
        }
      ]
    },
    {
      path: '/',
      redirect: '/login',
    },
    {
      path: '/login',
      name: 'login',
      component: face
    },
    {
      path: '/loginFace',
      name: 'loginFace',
      component: face
    },
  ]
})
