<template>
  <div class="home">
    <LoadingPage :isLoading="isLoading"></LoadingPage>
    <router-view></router-view>
  </div>
</template>

<script>
import LoadingPage from '@/components/frontend/LoadingPage'

export default {
  components: {
    LoadingPage
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  }
}
</script>
