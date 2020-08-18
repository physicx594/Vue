<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
    <a class="navbar-brand" href="#">Logo</a>
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
          <router-link class="nav-link" to="/admin/products"><span> 產品列表 </span></router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/coupons"><span> 優惠券列表 </span></router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/orders"><span>訂單列表 </span></router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/storages"><span>圖片列表 </span></router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/"><span>回首頁</span></router-link>
        </li>
      </ul>
    </div>
    <div class="text-right">
      <button class="btn btn-outline-light my-2" type="submit" @click="signOut">登出</button>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    signOut () {
      document.cookie = 'token=; expires=; path=/'
      setTimeout(() => {
        this.$router.push('/')
      }, 1000)
    }
  }
}
</script>

<style lang="scss">

.navbar-dark .navbar-nav .nav-link{
  display: block;
  margin:  0 8px;
  &::after{
    content: '';
    display: block;
    width: 0;
    height: 2px;
    background:white;
    transition: width .5s;
  }
  &:hover::after{
    width: 100%;
  }
  span{
    display: block;
    padding: 8px 0
  }
}
</style>
