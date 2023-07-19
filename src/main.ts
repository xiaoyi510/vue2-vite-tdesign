import { PiniaVuePlugin, createPinia } from 'pinia';
import Vue from 'vue';

// import ElementUI from 'element-ui'
// import 'element-ui/lib/theme-chalk/index.css'
// import locale from 'element-ui/lib/locale/lang/zh-CN.js' // lang i18n

import TDesign from 'tdesign-vue';
// 引入组件库的少量全局样式变量
import 'tdesign-vue/es/style/index.css';

import App from '@/App.vue';

import 'virtual:windi.css';

import router from '@/router';

Vue.config.productionTip = false
Vue.config.devtools = true

Vue.use(PiniaVuePlugin)
// Vue.use(ElementUI, { locale })
Vue.use(TDesign);


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  pinia: createPinia(),
  render: h => h(App),
})
