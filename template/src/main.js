{{#if_eq build "standalone"}}
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
{{/if_eq}}
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App'
import routes from './router'
import store from './vuex/store'
//rem布局库
import '../static/lib/newflexible'
import es6Promise from 'es6-promise'
//ajax请求
import lotusAjax from './lotusPlugins/lotusApiRequest'
//apiUrl地址
import lotusApiUrl from './lotusPlugins/lotusApiUrl'
//动态修改微信title
import lotusChangeTitle from './lotusPlugins/lotusChangeTitle'
//全站工具类包括了正则验证、页面title、json转字符串、字符串转json
import lotusUtils from './lotusPlugins/lotusUtils'
//获取微信签名配置
import {getWxSignConfig} from './Utils/getWxConfig'
/*import VueLazyload from 'vue-lazyload'*/
//loading 组件
import lotusLoading from './lotusPlugins/lotusLoading'
//toast 组件
import lotusToast from './lotusPlugins/lotusToast'
//lotusNoDataNav 组件
import lotusNoDataNav from './lotusPlugins/lotusNoDataNav'
//查看大图组件
import lotusPreViewer from './lotusPlugins/lotusPreViewer'
//日期控件
import lotusCalendar from 'lotus-calendar'
import 'lotus-calendar/dist/lotus-calendar.min.css'
import lotusQuery from 'lotus-url-query-string'

es6Promise.polyfill()
Vue.use(VueRouter)
Vue.use(lotusAjax)
Vue.use(lotusApiUrl)
Vue.use(lotusChangeTitle)
Vue.use(lotusUtils)
Vue.use(lotusLoading)
Vue.use(lotusToast)
Vue.use(lotusNoDataNav)
Vue.use(lotusPreViewer)
Vue.use(lotusCalendar)


Vue.config.productionTip = false


const router = new VueRouter({
    routes
});
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App),
  components: { App },
  template: '<App/>'
})
