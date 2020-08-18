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
          <router-link class="nav-link" to="/admin/products">產品列表</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/coupons">優惠券列表</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/orders">訂單列表</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/admin/storages">圖片列表</router-link>
        </li>
        <li class="nav-item">
          <router-link class="nav-link" to="/">回首頁</router-link>
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

</style>
