{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import App from './App'
{{#router}}
import router from './router'
{{/router}}

Vue.config.productionTip = false
// 重置样式

import '@/assets/css/reset.css'
// 重置vantUI样式
import '@/assets/css/resetui.css'

// 导入vant
import '@/assets/js/vant'

// 导入一次封装的 axios
import {get, post} from '@/assets/js/http'
Vue.prototype.$get = get
Vue.prototype.$post = post

// 导入公用函数
import utils from '@/assets/js/util';
Vue.prototype.$utils = utils

// 导入公用组件
// import components from './components'
// Vue.use(components)

// 导入自定义指令
import directives from './directives'
Vue.use(directives)

// 时间过滤2位
Vue.filter('dateFormat', function (originValue) {
  return originValue < 10? "0" + originValue : originValue
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  {{#router}}
  router,
  {{/router}}
  {{#if_eq build "runtime"}}
  render: h => h(App)
  {{/if_eq}}
  {{#if_eq build "standalone"}}
  components: { App },
  template: '<App/>'
  {{/if_eq}}
})
