<template>
  <div class="fontNavBar">
    <div class="container p-0">
      <nav class="navbar navbar-expand-lg navbar-light  justify-content-between p-0">
        <a class="navbar-brand p-0" href="#"><img src="../../assets/logo1.png" width="60"></a>
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
            <li class="nav-item">
              <router-link class="nav-link" to="/" :class="{active: status === '首頁'}"><span
              @click="status = '首頁'"> 首頁 </span></router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/products" :class="{active: status === '產品列表'}"><span @click="status = '產品列表'"> 產品列表 </span></router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/" :class="{active: status === '關於我們'}"><span @click="status = '關於我們'"> 關於我們 </span></router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/" :class="{active: status === '會員'}"><span @click="status = '會員'"><i class="fas fa-user" style="font-size:18px"></i></span></router-link>
            </li>
            <li class="nav-item d-flex">
              <router-link class="nav-link" to="/" :class="{active: status === '購物車'}">
                <span @click="status = '購物車'">
                  <i class="fas fa-shopping-cart" style="font-size:18px"></i>
                </span>
              </router-link>
              <span class="badge badge-pill badge-brown" v-if="cart.length">{{ cart.length }}</span>
            </li>
          </ul>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      status: '',
      cart: []
    }
  },
  methods: {
    getCart () {
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`
      this.axios.get(api)
        .then((res) => {
          this.cart = res.data.data
        })
    }
  },
  created () {
    this.getCart()
  }
}
</script>

<style lang="scss">
.fontNavBar{
  .navbar-light .navbar-nav .nav-link{
    font-weight: bold;
    margin-right: 10px;
    transition: 1s;
    &:hover, &:active{
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
  }
  .badge{
    height: 20px;
    color: white;
    text-align: center;
    transform: translateX(-16px) translateY(20px);
  }
}
</style>
