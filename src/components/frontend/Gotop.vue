<template>
  <div class="go-top" :class="{ 'show': show }" @click="goTop()">
    <i class="fas fa-chevron-up"></i>
  </div>
</template>

<script>
export default {
  data () {
    return {
      show: false
    }
  },
  created () {
    window.addEventListener('scroll', this.showGotop)
  },
  methods: {
    showGotop () {
      // console.log(window.innerHeight, window.pageYOffset)
      if (window.pageYOffset >= 560) {
        this.show = true
      } else {
        this.show = false
      }
    },
    goTop () {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      })
    }
  }
}
</script>
