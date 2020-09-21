<template>
  <div class="CheckoutSuccess">
    <Navbar></Navbar>
    <LoadingPage></LoadingPage>
    <div class="thanks"></div>
    <div class="section mt-5">
        <div class="h1 payed">付款完成</div>
        <span>我們已收到您的訂單，感謝您的支持</span>
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
  .thanks{
    width: 100%;
    height: 50vh;
    background-attachment: fixed;
    background-size: cover;
    background: url("https://images.unsplash.com/photo-1494859802809-d069c3b71a8a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80") no-repeat center center;
  }
  .section{
    position: relative;
    width: 30%;
    height: 30%;
    margin: 0 auto;
    .payed{
      padding: 20px;
      font-weight: bold;
      // text-align: left;
      color: $primary;
      &~ span{
        font-weight: bold;
        font-size: 20px;
        background-image: linear-gradient(to right, $primary 30%, $contrast 100%);
        background-clip: text;
        color: transparent;
      }
    }
  }
  .Footer{
    position: absolute;
    bottom: 0;
  }
}

</style>
