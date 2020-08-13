import Vue from 'vue'
import Loading from 'vue-loading-overlay'
import 'vue-loading-overlay/dist/vue-loading.css'
import axios from 'axios'
import VueAxios from 'vue-axios'
import 'bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'
import $ from 'jquery'
// import Viewer from 'v-viewer'
import Viewer from 'v-viewer'
import 'viewerjs/dist/viewer.css'

import App from './App.vue'
import router from './router'
import Pagination from './components/Pagination'

window.$ = $
Vue.config.productionTip = false
Vue.component('Loading', Loading)
Vue.use(VueAxios, axios)
Vue.use(Viewer)
Vue.filter('filter', (num) => {
  var parts = num.toString().split('.')
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',')
  return '$' + parts.join('.')
})
Vue.component('Pagination', Pagination)

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
