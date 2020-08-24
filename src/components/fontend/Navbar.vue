<template>
  <div class="fontNavBar">
    <div class="container">
      <nav class="navbar navbar-expand-lg navbar-light  justify-content-between">
        <a class="navbar-brand p-0" href="#"><img src="../../assets/logo1.png" width="40"></a>
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
        <div class="text-center">
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
              <router-link class="nav-link" to="/" :class="{active: status === '會員'}"><span @click="status = '會員'"><i class="fas fa-user" style="font-size:16px"></i></span></router-link>
            </li>
            <li class="nav-item">
              <router-link class="nav-link" to="/" :class="{active: status === '購物車'}"><span @click="status = '購物車'"><i class="fas fa-shopping-cart" style="font-size:16px" ></i>
</span></router-link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      status: ''
    }
  },
  methods: {
  },
  created () {
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
    // &:active{
    //   border-bottom: 1px #de9e36 solid;
    // }
    &:hover::after{
    width: 100%;
    }
    span{
      display: block;
      padding: 4px 0
    }
  }
}
</style>
