<template>
  <div class="home">
    <Navbar></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from '@/components/frontend/Navbar'

export default {
  name: 'Home',
  components: {
    Navbar
  }
}
</script>
<style lang="scss">
  .home{
    text-align: center;
    height: 100%;

  }
</style>
