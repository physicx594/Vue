import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // dashboard
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/dashboard/Home.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/dashboard/Products.vue')
      }
    ]
  },
  {
    path: '/about',
    name: 'About',
    component: () => import('../views/About.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
