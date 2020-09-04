import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // frontend
  {
    path: '/',
    component: () => import('../views/Home.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/fontend/Products.vue')
      },
      {
        path: 'product/:id',
        component: () => import('../views/fontend/Product.vue')
      },
      {
        path: 'Cart',
        component: () => import('../views/fontend/Cart.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/Login.vue')
  },
  // backend
  {
    path: '/admin',
    name: 'Dashboard',
    component: () => import('../views/backend/Dashboard.vue'),
    children: [
      {
        path: 'products',
        component: () => import('../views/backend/Products.vue')
      },
      {
        path: 'coupons',
        component: () => import('../views/backend/Coupons.vue')
      },
      {
        path: 'orders',
        component: () => import('../views/backend/Orders.vue')
      },
      {
        path: 'storages',
        component: () => import('../views/backend/Storages.vue')
      }
    ]
  }
]

const router = new VueRouter({
  routes,

  scrollBehavior (to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})

export default router
