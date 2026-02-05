import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  strict: true,
  state: {
    isLoading: false,
    formLoading: false,
    products: [],
    pagination: {},
    cart: [],
    totalPrice: 0,
    shippingFee: 0,
    openMsg: false,
    joinMsg: true
  },
  actions: {
    updateLoading (context, payload) {
      context.commit('LOADING', payload)
    },
    getProducts (context, page = 1) {
      context.commit('LOADING', true)
      if (!this.openMsg) context.commit('LOADING', true)
      const params = {
        page,
        paged: '20',
        orderBy: 'created_at, updated_at',
        sort: 'asc' // 排序遞增
      }
      const api = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_UUID}/products?page=${params.page}`
      axios.get(api)
        .then(res => {
          console.log(res.data)
          context.commit('GETPRODUCTS', res.data.products)
          context.commit('PAGINATION', res.data.pagination)
          if (this.category !== '全部商品') {
            window.scrollTo({
              top: 561,
              behavior: 'smooth'
            })
          }
          context.commit('LOADING', false)
        })
        .catch(res => {
          console.log(res)
        })
    },
    getCart (context) {
      const api = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_UUID}/cart`
      axios.get(api)
        .then((res) => {
          context.commit('CART', { type: 'getlist', data: res.data.data.carts })
          context.commit('TOTALPRICE')
          context.commit('SHIPPINGFEE')
          //     this.totalPrice > 3000 ? this.shippingFee = 0 : this.shippingFee = 200
          //     this.$store.dispatch('updateLoading', false)
          context.commit('FORMLOADING', false)
        })
    },
    addToCart (context, { item, quantity }) {
      const api = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_UUID}/cart`
      const cart = {
        data: {
          product_id: item.id,
          qty: quantity
        }
      }
      axios.post(api, cart)
        .then(() => {
          context.dispatch('getCart')
          context.commit('OPENMSG', true)
          setTimeout(() => {
            context.commit('OPENMSG', false)
          }, 2500)
        })
        .catch(error => {
          context.commit('OPENMSG', true)
          context.commit('JOINMSG', false)
          setTimeout(() => {
            context.commit('OPENMSG', false)
            context.commit('JOINMSG', true)
          }, 2500)
          console.log(error)
        })
    },
    delItem (context, id) {
      context.commit('FORMLOADING', true)
      const api = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_UUID}/cart/${id}`
      axios.delete(api)
        .then((res) => {
          context.dispatch('getCart')
          // context.commit('FORMLOADING', false)
        })
    },
    changeQuantity (context, { item, quantity }) {
      context.commit('FORMLOADING', true)
      const api = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_UUID}/cart/${item.id}`
      const cart = {
        data: {
          product_id: item.product.id,
          qty: quantity
        }
      }
      axios.put(api, cart)
        .then((res) => {
          context.dispatch('getCart')
        })
    }
  },
  mutations: {
    LOADING (state, payload) {
      state.isLoading = payload
    },
    FORMLOADING (state, payload) {
      state.formLoading = payload
    },
    GETPRODUCTS (state, payload) {
      state.products = payload
    },
    PAGINATION (state, payload) {
      state.pagination = payload
    },
    CART (state, payload) {
      if (payload.type === 'getlist') {
        state.cart = payload.data
      } else {
        state.cart.push(payload.data)
      }
    },
    TOTALPRICE (state) {
      state.totalPrice = 0
      state.cart.forEach((item) => {
        state.totalPrice += Number(
          item.product.price * item.qty || item.product.origin_price * item.qty
        )
      })
    },
    SHIPPINGFEE (state) {
      state.totalPrice > 3000 ? state.shippingFee = 0 : state.shippingFee = 200
    },
    OPENMSG (state, payload) {
      state.openMsg = payload
    },
    JOINMSG (state, payload) {
      state.joinMsg = payload
    }
  },
  getters: {}
})
