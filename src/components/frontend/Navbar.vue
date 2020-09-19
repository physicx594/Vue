<template>
  <div class="NavBar">
    <div class="container p-0">
      <nav class="navbar navbar-expand-lg   justify-content-between ">
        <a class="navbar-brand p-0" href="#"><img src="@/assets/logo.png" width="60"></a>
        <button
          class="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
          <ul class="navbar-nav">
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
                <span class="member">
                  <i class="fas fa-user" style="font-size:18px"></i>
                </span>
            </li>
            <li class="nav-item " @click.prevent="openCart = true" >
                <span class="cart" :class="{openCart:openCart}">
                  <i class="fas fa-shopping-cart" style="font-size:18px"></i>
                </span>
              <div class="cartQTY" v-if="cart.length >= 0">{{ cart.length }}</div>
            </li>
          </ul>
      </nav>
    </div>
    <ShoppingCart :openCart="openCart" :cart="cart" :totalPrice="totalPrice" @update="getCart" @close="closeCart"></ShoppingCart>
    <div class="mask" :class="{ 'open': openCart }" @click.prevent="openCart = !openCart"></div>
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
      cart: [],
      openCart: false,
      totalPrice: 0,
      isLoading: false,
      cancel: false
    }
  },
  methods: {
    getCart () {
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`
      this.axios.get(api)
        .then((res) => {
          this.cart = res.data.data
          this.totalPrice = 0
          this.cart.forEach((item) => {
            this.totalPrice += Number(
              item.product.price * item.quantity || item.product.origin_price * item.quantity
            )
          })
        })
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
  created () {
    this.getCart()
    this.$bus.$on('get-cart', () => {
      this.getCart()
    })
  },
  beforeDestroy () {
    this.$bus.$off('get-cart')
  }
}
</script>

<style lang="scss">
$primary : #264710;
$secondary: #de9e36;
$contrast: #800000;
$bgD:#CED4DA;
$bgL:#F7F7F7;

.NavBar{
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 1030;
  background: #ffffff;
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.06);
  nav .navbar-nav {
    .nav-link, .cart, .member{
      position: relative;
      font-size: 16px;
      font-weight: bold;
      margin-right: 10px;
      padding: 0 10px;
      transition: 0.5s;
      color: $primary;
    }
    .nav-link{
      &:hover, &.active{
        color: $contrast;
        &::after{
          width: 50%;
        }
      }
      &::after{
        content: '';
        display: block;
        margin: 0 auto;
        width: 0;
        height: 1px;
        background: $contrast;
        transition:  0.5s;
      }
    }
    .nav-item{
      position: relative;
      cursor: pointer;
        &:hover .member, &:hover .cart{
          color: $contrast;
          &~.cartQTY{
          color: $contrast;
          border: 1px solid $contrast;
          }
        }
      .cart.openCart{
        color: $contrast;
        &~.cartQTY{
          color: $contrast;
          border: 1px solid $contrast;
        }
      }
      .cartQTY{
        box-sizing: content-box;
        position: absolute;
        right: 0;
        top: 0;
        width: 20px;
        height: 20px;
        border-radius: 50px;
        line-height: 20px;
        font-size: 14px;
        text-align: center;
        background: rgb(255, 255, 255);
        color: $primary;
        transform: translateX(-10px) translateY(-10px);
        transition:  0.5s;
        border: 1px solid $primary;
      }
    }
  }
  .mask{
    display: none;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: rgba(255, 255, 255, 0);
    z-index: 1999;
    &.open{
      display: block
    }
  }
}

</style>
