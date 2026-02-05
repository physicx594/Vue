<template>
  <div>
    <Navbar></Navbar>
    <div class="container">
      <Toast></Toast>
    </div>
    <router-view :token="token" v-if="checkSuccess"></router-view>
    <div v-else class="mt-5">
      <Loading :active.sync="isLoading"></Loading>
    </div>
  </div>
</template>

<script>
import Navbar from '@/components/backend/Navbar'
import Toast from '@/components/backend/Toast'

export default {
  components: {
    Navbar,
    Toast
  },
  name: 'Dashboard',
  data () {
    return {
      token: '',
      checkSuccess: false,
      isLoading: true
    }
  },
  methods: {
    checkLogin () {
      this.token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      this.axios.defaults.headers.common.Authorization = this.token
      const api = `${process.env.VUE_APP_API_URL}/api/user/check`
      this.axios
        .post(api, {
          api_token: this.token
        })
        .then((res) => {
          if (res.data.success) {
            this.checkSuccess = true
          } else {
            this.$router.push('/login')
          }
        })
        .catch((error) => {
          this.$router.push('/login')
          console.log(error, '登入失敗,請重新登入')
        })
    }
  },
  created () {
    this.checkLogin()
  }
}
</script>
