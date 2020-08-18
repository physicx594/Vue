<template>
  <div>
    <Navbar></Navbar>
    <router-view :token="token" v-if="checkSuccess"></router-view>
    <div v-else class="mt-5">
      <Loading :active.sync="isLoading"></Loading>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/backend/Navbar'

export default {
  components: {
    Navbar
  },
  data () {
    return {
      token: '',
      checkSuccess: false,
      isLoading: true
    }
  },
  created () {
    this.checkLogin()
  },
  methods: {
    checkLogin () {
      this.token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      this.axios.defaults.headers.common.Authorization = `Bearer ${this.token}`
      const api = `${process.env.VUE_APP_APIPATH}/auth/check`
      this.axios
        .post(api, {
          api_token: this.token
        })
        .then((res) => {
          this.checkSuccess = true
        })
        .catch((error) => {
          this.$router.push('/login')
          console.log(error, '登入失敗,請重新登入')
        })
    }
  }
}
</script>
