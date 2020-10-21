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

<style lang="scss">
.go-top{
    position : fixed;
    right: 25px;
    bottom: 25px;
    width: 40px;
    height: 40px;
    padding-top: 7px;
    border-radius: 50%;
    box-shadow: 0px 0px 10px -3px black;
    background: white;
    font-size: 15px;
    cursor: pointer;
    z-index: 1100;
    opacity: 0;
    transition: 0.5s ease-in-out;
    animation: jump 1s linear infinite;
    &.show{
      opacity: 1;
    }
    @keyframes jump {
      25% {
        transform: translateY(10px);
      }
      50%{
        transform: translateY(0);
      }
      75% {
        transform: translateY(-10px);
      }
      100% {
        transform: translateY(0);
      }

    }
}
</style>
