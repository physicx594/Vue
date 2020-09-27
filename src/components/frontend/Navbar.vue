<template>
  <div class="NavBar">
    <div class="top">
      <div class="container">
      <a class="p-0" href="/"><img src="@/assets/logo.png" width="60"></a>
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
          <!-- <div class="cartQTY" v-if="cart.length > 0">{{ cart.length }}</div> -->
        </li>
      </ul>
    </div>
    <ShoppingCart :openCart="openCart" :cart="cart" :totalPrice="totalPrice" @update="getCart" @close="closeCart"></ShoppingCart>
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
      cart: [],
      show: false,
      openCart: false,
      totalPrice: 0,
      isLoading: false,
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
  width: 100%;
  position: relative;
  .top{
    width: 100%;
    margin: 0 auto;
    position: fixed;
    top: 0;
    left: 0;
    z-index: 1030;
    background: #ffffff;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.06);
    .container{
      position: relative;
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 16px;
      max-height: 80px;
    }
    ul{
      display: flex;
      align-items: center;
      list-style: none;
      margin: 0;
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
    @media screen and (max-width: 768px){
      .container{
        display: flex;
        justify-content: space-between;
        .menu{
          position: relative;
          span{
            display: block;
            margin: 5px auto;
            width: 30px;
            height: 3px;
            background: $primary;
            transition: .3s ease-in;
          }
          &.show{
            span{
              &:nth-child(1){
                transition: .3s ease-in-out;
                transform: rotate(45deg) translate(7px,9px);
              }
              &:nth-child(2){
                transition: .3s ease-in-out;
                transform: rotate(-45deg) translate(-3px,-0px);
              }
              &:nth-child(3){
                transition: .3s ease-in-out;
                transform: rotate(-45deg) translate(2.5px,-5.5px);
              }
            }
          }
        }
        img{
          width: 80px;
        }
        ul{
          display: none;
        }
      }
    }
  }
  .columnNav{
    position: fixed;
    top: 80px;
    width: 100%;
    height: 0%;
    background: rgba(255, 255, 255, 0.95);
    transition: all .3s ease-in-out;
    overflow: hidden;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
    z-index: 2001;
  }
  @media screen and (max-width: 768px){
    .columnNav{
      font-family: 'Arial';
      ul{
        padding: 20px 0;
        margin: 0;
        list-style: none;
        a{
          font-size: 24px;
          font-weight: 500;
          margin:5px;
          color: $primary;
          &:active{
            background: $primary;
            color: #fff;
          }
        }
      }
      &.show{
        height: 330px;
        transition: all .3s ease-in-out;
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
    &.open,&.show{
      display: block
    }
  }
}

</style>
