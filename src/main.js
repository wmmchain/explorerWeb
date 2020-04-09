// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/store.js';
import axios from './store/fetch.js'

Vue.prototype.$axios = axios  
Vue.prototype.$baseURL='http://api_testnet.wmmchain.cc/';//测试
// Vue.prototype.$baseURL='http://api.wmmchain.cc/';//线上
// Vue.prototype.$baseURL='/apis/';//apis 


import moment from 'moment'//导入文件 
Vue.prototype.$moment = moment;//赋值使用
Vue.filter('dateformat', function(dataStr, pattern = 'YYYY-MM-DD HH:mm:ss') {
      return moment(dataStr).format(pattern)
})
Vue.filter('dateFromNow', function(dataStr) {
      return moment(dataStr).startOf('hour').fromNow();
})
// moment().startOf('hour').fromNow();   
import ElementUI from 'element-ui';

import 'element-ui/lib/theme-chalk/index.css';
import '../theme/index.css'
Vue.use(ElementUI);

import echarts from 'echarts'
Vue.prototype.$echarts = echarts ;
import charts from '@/components/common/chart.js'
Vue.prototype.charts = charts

Vue.config.productionTip = false
import utill from './components/common/util.js'
Vue.prototype.$utill = utill
Vue.filter('stringslice', function(dataStr,num1,num2) {
      return utill.stringSlice(dataStr,num1,num2)
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
