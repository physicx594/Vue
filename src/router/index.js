import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  // frontend
  {
    path: '/',
    component: () => import('../views/frontend/Home.vue'),
    children: [
      {
        path: '',
        name: 'index',
        component: () => import('../views/frontend/Index.vue')
      },
      {
        path: 'products',
        name: 'products',
        component: () => import('../views/frontend/Products.vue')
      },
      {
        path: 'product/:id',
        name: 'product',
        component: () => import('../views/frontend/Product.vue')
      },
      {
        path: 'about',
        name: 'about',
        component: () => import('../views/frontend/About.vue')
      },
      {
        path: 'cart',
        name: 'cart',
        component: () => import('../views/frontend/Cart.vue')
      },
      {
        path: 'checkout',
        name: 'checkout',
        component: () => import('../views/frontend/Checkout.vue')
      },
      {
        path: 'checkoutPay',
        name: 'checkoutPay',
        component: () => import('../views/frontend/CheckoutPay.vue')
      },
      {
        path: 'checkoutSuccess',
        name: 'checkoutSuccess',
        component: () => import('../views/frontend/CheckoutSuccess.vue')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('../views/backend/Login.vue')
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
  linkExactActiveClass: 'active',
  scrollBehavior (to, from, savedPosition) {
    return {
      x: 0,
      y: 0
    }
  }
})

export default router
