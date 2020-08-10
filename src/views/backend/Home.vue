<template>
  <div>
    <nav
      class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between"
    >
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
            <router-link class="nav-link" to="/admin/products"
              >產品列表</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/coupons"
              >優惠券列表</router-link
            >
          </li>
          <li class="nav-item">
            <router-link class="nav-link" to="/admin/orders"
              >訂單列表</router-link
            >
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
    <router-view :token="token" v-if="checkSuccess"></router-view>
    <div v-else class="mt-5">
      <h1 class="d-inline-flex mr-1">資料驗證中</h1>
      <span class="spinner-border text-secondary"></span>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      token: '',
      checkSuccess: false
    }
  },
  created () {
    this.checkLogin()
  },
  methods: {
    checkLogin () {
      this.token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/, '$1')
      this.axios.defaults.headers.common.Authorization = `Bearer ${this.token}`
      const api = `${process.env.VUE_APP_APIPATH}/auth/check`
      this.axios.post(api, {
        api_token: this.token
      })
        .then((res) => {
          // this.isLoading = false
          this.checkSuccess = true
        })
        .catch((error) => {
          this.$router.push('/login')
          console.log(error, '登入失敗,請重新登入')
        })
    },
    signOut () {
      document.cookie = 'token=; expires=; path=/'
      setTimeout(() => {
        this.$router.push('/')
      }, 1000)
    }
  }
}
</script>

<style></style>
