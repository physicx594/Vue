<template>
  <div class="Login">
    <form class="form-signin" @submit.prevent="signin">
      <h1 class="h3 mb-3 ">
        會員登入
      </h1>
      <div class="form-group text-left">
        <label for="inputEmail" class="font-weight-700">帳號</label>
        <input
          id="inputEmail"
          v-model="user.email"
          type="email"
          class="form-control"
          placeholder="Email address"
          required
          autofocus
        />
      </div>
      <div class="form-group text-left">
        <label for="inputPassword">密碼</label>
        <input
          id="inputPassword"
          v-model="user.password"
          type="password"
          class="form-control"
          placeholder="Password"
          required
        />
      </div>
      <button class="btn submit" type="submit">
        登入
      </button>
      <router-link to="/" class="btn  btn-outline-secondary"
        >回首頁</router-link
      >
    </form>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      user: {
        email: '',
        password: ''
      },
      token: ''
    }
  },
  methods: {
    signin () {
      const api = `${process.env.VUE_APP_APIPATH}/auth/login`
      this.axios
        .post(api, this.user)
        .then(res => {
          const token = res.data.token
          const expired = res.data.expired
          document.cookie = `token=${token}; expires=${new Date(
            expired * 1000
          )}; path=/`
          console.log('登入成功')
          this.$router.push('/admin/products')
        })
        .catch(error => {
          console.log(error)
        })
    },
    getData () {
      // 取得 token 的 cookies（注意取得的時間點）
      // 詳情請見：https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie
      this.token = document.cookie.replace(
        /(?:(?:^|.*;\s*)token\s*=\s*([^;]*).*$)|^.*$/,
        '$1'
      )
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/products`
      // 將 Token 加入到 Headers 內
      this.axios.defaults.headers.common.Authorization = `Bearer ${this.token}`
      this.axios.get(api).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

<style lang="scss">
.Login {
    height: 100vh;
    background: url(https://images.unsplash.com/photo-1495195134817-aeb325a55b65?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1055&q=80) center top no-repeat;
  background-size: cover;
  form {
    width: 300px;
    position: absolute;
    left: 50%;
    top:50%;
    transform: translate(-50%, -50%);
    padding: 30px 20px;
    text-align: center;
    background-color: white;
    color: #343a40;
    border-radius: 6px;
    box-shadow: 0px 0px 10px 1px rgb(0, 0, 0);
    .form-control {
      background-color: rgba(255, 255, 255, 0.7);
      &:focus {
        background-color: rgba(255, 255, 255, 0);
        border-color: #343a40;
        box-shadow: none;
      }
    }
  }
  .btn {
    width: 100%;
    margin-top: 24px;
    padding: 0;
  }
  .submit {
    color: #f45b30;
    border: 1px solid #f45b30;
    background-color: #fff;
    &:hover,
    &:focus {
      color: #fff;
      background-color: #f45b30;
      box-shadow: none;
    }
  }
}
</style>
