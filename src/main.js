// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import store from './store/index'
import router from './router'
import axios from 'axios'
import mock from '../mock/mock'

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// svg图标
import Icon from 'vue-svg-icon/Icon.vue';

Vue.use(Vuex);
Vue.use(ElementUI);
Vue.component('icon', Icon);  

Vue.prototype.$http = axios;
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
