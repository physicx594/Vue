import Vue from 'vue'
import store from './store'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import $ from 'jquery'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'
import { ValidationObserver, ValidationProvider, extend, localize, configure } from 'vee-validate'
import * as rules from 'vee-validate/dist/rules'
import TW from 'vee-validate/dist/locale/zh_TW.json'
import AOS from 'aos'
import 'aos/dist/aos.css'

import App from './App.vue'
import router from './router'
import Pagination from './components/Pagination'
import Gotop from './components/frontend/Gotop'
import orderIdFilter from './filters/orderId'
import moneyfilter from './filters/money'
import './bus'

window.$ = $
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(Viewer)

Vue.filter('money', moneyfilter)
Vue.filter('orderId', orderIdFilter)
Vue.component('Loading', Loading)
Vue.component('Pagination', Pagination)
Vue.component('Gotop', Gotop)
Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
localize('zh_TW', TW)
Object.keys(rules).forEach(rule => {
  extend(rule, rules[rule])
})
configure({
  classes: {
    valid: 'is-valid',
    invalid: 'is-invalid'
  }
})

new Vue({
  created () {
    AOS.init()
  },
  router,
  store,
  render: h => h(App)
}).$mount('#app')
