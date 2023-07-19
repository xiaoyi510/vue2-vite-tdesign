import router from '@/router';
import { PiniaVuePlugin, createPinia } from 'pinia';
import TDesign from 'tdesign-vue';
import 'tdesign-vue/es/style/index.css';
import 'virtual:windi.css';
import Vue from 'vue';
import VueRouter from 'vue-router';

import App from '@/App.vue';


Vue.config.productionTip = false
Vue.config.devtools = true

Vue.use(PiniaVuePlugin)
Vue.use(TDesign);

// 增加push方法
const originPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location) {
  return originPush.call(this, location).catch((err) => err);
};

// 增加replace方法
const originReplace = VueRouter.prototype.replace;
VueRouter.prototype.replace = function replace(location) {
  return originReplace.call(this, location).catch((err) => err);
};


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  pinia: createPinia(),
  render: h => h(App),
})
