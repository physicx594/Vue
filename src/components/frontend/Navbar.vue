<template>
  <div class="frontNavBar">
    <div class="container p-0">
      <nav class="navbar navbar-expand-lg navbar-light  justify-content-between ">
        <a class="navbar-brand p-0" href="#"><img src="../../assets/logo.png" width="60"></a>
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
            <li class="nav-item"  @click="status = '首頁'">
              <router-link class="nav-link" to="/" :class="{active: status === '首頁'}"><span> 首頁 </span></router-link>
            </li>
            <li class="nav-item" @click="status = '產品列表'">
              <router-link class="nav-link" to="/products" :class="{active: status === '產品列表'}"><span> 產品列表 </span></router-link>
            </li>
            <li class="nav-item" @click="status = '關於我們'">
              <router-link class="nav-link" to="/about" :class="{active: status === '關於我們'}"><span > 關於我們 </span></router-link>
            </li>
            <li class="nav-item" @click="status = '會員'">
              <router-link class="nav-link" to="/" :class="{active: status === '會員'}">
                <span>
                  <i class="fas fa-user" style="font-size:18px"></i>
                </span>
              </router-link>
            </li>
            <li class="nav-item " @click="status = '購物車', openCart = true" >
              <router-link class="nav-link" to="" :class="{active: status === '購物車'}" >
                <span>
                  <i class="fas fa-shopping-cart" style="font-size:18px"></i>
                </span>
                <div class="cartQTY" :class="{active: status === '購物車'}" v-if="cart.length >= 0">{{ cart.length }}</div>
              </router-link>
            </li>
          </ul>
      </nav>
    </div>
    <div is="ShoppingCart" :openCart="openCart" :cart="cart" :totalPrice="totalPrice" @update="getCart" @close="closeCart"></div>
    <div class="mask" :class="{ 'open': openCart }" @click.prevent="openCart = !openCart, status = ''"></div>
  </div>
</template>

<script>
import ShoppingCart from '../ShoppingCart'

export default {
  components: {
    ShoppingCart
  },
  data () {
    return {
      status: '',
      cart: [],
      openCart: false,
      totalPrice: 0,
      isLoading: false
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
  }
}
</script>

<style lang="scss">
.frontNavBar{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: 1030;
    background: rgb(255, 255, 255);
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.06);
  .navbar-light .navbar-nav .nav-link{
    position: relative;
    font-size: 18px;
    font-weight: bold;
    margin-right: 10px;
    padding: 0 10px;
    transition: 1s;
    &:hover, &:active{
      color: #de9e36;
    }
    &:hover .cartQTY, .cartQTY.active{
      border: 1px solid #de9e36;
      background-color: white;
      color: #de9e36;
    }
    &::after{
    content: '';
    display: block;
    width: 0;
    height: 1px;
    background:#de9e36;
    transition:  0.7s;
    }
    &:hover::after{
    width: 100%;
    }
    span{
      display: block;
      padding: 4px 0
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
      background: #de9e36;
      color: white;
      transform: translateX(2px) translateY(13px);
      transition:  1s;
      border: 1px solid transparent;
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
