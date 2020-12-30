import Vue from 'vue';
import {Lazyload } from 'vant';
import 'vant/lib/index.css';

Vue.use(Toast);
Vue.use(Lazyload);

Vue.prototype.$Toast = Toast