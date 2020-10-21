<template>
  <div class="NavBar">
    <div class="top">
      <div class="container">
      <router-link class="p-0" to="/"><img src="@/assets/logo.png" width="60"></router-link>
      <div class="menu" :class="{show:show}" @click="show = !show">
        <span></span>
        <span></span>
        <span></span>
      </div>
        <ul class="linkList">
          <li class="" >
            <router-link class="nav-link" to="/"><span> 首頁 </span></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/products"><span> 產品列表 </span></router-link>
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/about"><span > 關於我們 </span></router-link>
          </li>
          <li class="nav-item">
              <span class="member">
                <i class="fas fa-user" style="font-size:18px"></i>
              </span>
          </li>
          <li class="nav-item " @click.prevent="openCart = true" >
              <span class="cart" :class="{openCart:openCart}">
                <i class="fas fa-shopping-cart" style="font-size:18px"></i>
              </span>
            <div class="cartQTY" v-if="cart.length > 0">{{ cart.length }}</div>
          </li>
        </ul>
      </div>
    </div>
    <div class="columnNav" :class="{show:show}">
      <ul>
        <li class="nav-item" >
          <router-link class="nav-link" to="/"><span> 首頁 </span></router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/products"><span> 產品列表 </span></router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/about"><span > 關於我們 </span></router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="">
            <span class="member">
              會員專區
            </span>
          </router-link>
        </li>
        <li class="nav-item " @click.prevent="openCart = true; show = false" >
          <router-link class="nav-link" to="">
            <span class="cart" :class="{openCart:openCart}" >
              購物車<span v-if="cart.length > 0">( {{ cart.length }} )</span>
            </span>
          </router-link>
        </li>
      </ul>
    </div>
    <ShoppingCart :openCart="openCart" :cart="cart" :totalPrice="totalPrice"  @close="closeCart"></ShoppingCart>
    <div class="mask" :class="{ 'open': openCart, show}" @click.prevent="mask"></div>
  </div>
</template>

<script>
import ShoppingCart from './ShoppingCart'

export default {
  components: {
    ShoppingCart
  },
  data () {
    return {
      show: false,
      openCart: false,
      cancel: false
    }
  },
  methods: {
    mask () {
      if (this.show === false) {
        this.openCart = !this.openCart
      } else if (this.openCart === false) {
        this.show = !this.show
      } else if (this.show === true && this.openCart === true) {
        this.show = !this.show
        this.openCart = !this.openCart
      }
    },
    getCart () {
      this.$store.dispatch('getCart')
    },
    clearBus () {
      this.$bus.$off('get-cart')
    },
    clearCart () {
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping/all/product`
      this.axios.delete(api)
        .then((res) => {
          console.log(res)
        })
    },
    closeCart () {
      this.openCart = false
    }
  },
  computed: {
    cart () {
      return this.$store.state.cart
    },
    totalPrice () {
      return this.$store.state.totalPrice
    }
  },
  created () {
    this.getCart()
    this.$bus.$on('get-cart', () => {
      this.getCart()
    })
  },
  beforeDestroy () {
    this.clearBus()
  }
}
</script>
