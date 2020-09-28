<template>
  <div class="CheckoutSuccess">
    <Navbar></Navbar>
    <LoadingPage :isLoading="isLoading"></LoadingPage>
    <div class="thanks"></div>
    <div class="section">
        <div class="h1 payed">付款完成</div>
        <span>我們已收到您的訂單，感謝您的支持</span>
        <router-link to="/products"><button class="btn">再去逛逛</button></router-link>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '@/components/frontend/Navbar'
import Footer from '@/components/frontend/Footer'
import LoadingPage from '@/components/frontend/LoadingPage'

export default {
  components: {
    Navbar,
    Footer,
    LoadingPage
  },
  data () {
    return {
      isLoading: false
    }
  },
  created () {
    this.isLoading = true
    setInterval(() => {
      this.isLoading = false
    }, 1000)
  }
}
</script>

<style lang="scss">
$primary : #264710;
$secondary: #FEC81A;
$contrast: #800000;
$bgD:#CED4DA;
$bgL:#F7F7F7;
$dark: #474747;

.CheckoutSuccess {
  position: relative;
  height: 100%;
  .thanks{
    width: 100%;
    height: 50%;
    background-attachment: fixed;
    background-size: cover;
    background: url("https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80") no-repeat center center;
  }
  .section{
    width: 100%;
    min-height: 50%;
    padding: 64px 10px;
    margin: 0 0 -64px;
    .payed{
      font-weight: bold;
      color: $primary;
    }
    span{
      display: block;
      font-weight: bold;
      font-size: 20px;
      background-image: linear-gradient(to right, $primary 30%, $contrast 100%);
      background-clip: text;
      color: transparent;
      margin-bottom: 8px;
    }
    .btn{
      border-radius: 50px;
      border: 1px solid $contrast;
      background: $contrast;
      color: #fff;
      padding: 5px 30px;
    }
  }
  .footer{
    height: 64px;
  }
  @media screen and (max-width: 768px) {
    .section .payed{
      font-size: 30px;
    }
    .section span{
        font-size: 13px;
    }
  }
}

</style>
