import Vue from 'vue'
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

import App from './App.vue'
import router from './router'
import Pagination from './components/Pagination'
import Toast from './components/Toast'

window.$ = $
Vue.config.productionTip = false
Vue.use(VueAxios, axios)
Vue.use(Viewer)

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
Vue.component('Loading', Loading)
Vue.component('Pagination', Pagination)
Vue.component('Toast', Toast)
Vue.filter('filter', (num) => {
  var parts = num.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return 'NT $' + parts.join('.')
})
Vue.filter('orderId', (num) => {
  var parts = num.slice(0, 20)
  return parts
})
Vue.prototype.$bus = new Vue()

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
