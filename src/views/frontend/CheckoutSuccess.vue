<template>
  <div class="CheckoutSuccess">
    <Navbar></Navbar>
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

export default {
  name: 'CheckoutSuccess',
  components: {
    Navbar,
    Footer
  },
  created () {
    this.$store.dispatch('updateLoading', true)

    setTimeout(() => {
      this.$store.dispatch('updateLoading', false)
    }, 1000)
  }
}
</script>
