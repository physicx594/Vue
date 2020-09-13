<template>
  <div class="home">
    <Navbar></Navbar>
    <div class="block"></div>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '@/components/frontend/Navbar'
import Footer from '../components/frontend/Footer'

export default {
  name: 'Home',
  components: {
    Navbar,
    Footer
  }
}
</script>
<style lang="scss">
  .home{
    text-align: center;
    height: 100%;
  }
</style>
