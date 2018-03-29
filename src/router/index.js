import Vue from 'vue'
import Router from 'vue-router'
import Home from '../components/common/Home.vue'
import live from '../view/live/live.vue'
import test from '../components/test/test.vue'
import personal from '../view/personal/personal.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      children:[
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
        }
      ]
    },
  ]
})
