<template>
  <div class="go-top" :class="{ 'show': show }" @click="goTop()">
    <svg height="42" width="42">
      <circle cx="21" cy="21" r="20" />
    </svg>
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
      if (window.pageYOffset > 400) {
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
    right: 25px;;
    bottom: 25px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    border-radius: 50%;
    border: 1px solid $beige;
    background: $white;
    font-size: 15px;
    cursor: pointer;
    z-index: 1100;
    opacity: 0;
    transition: 0.5s ease-in-out;
    @include media-w568;
        right: 15px;
        bottom: 15px;
    &.show
        opacity: 1;
    svg
        position: absolute;
        stroke: black;
        stroke-width: 1px;
        fill: none;
        stroke-dasharray: 300
        stroke-dashoffset: 300
        transform: rotate(-90deg)
        transition: 1s linear
        &:hover
            stroke-dasharray: 300
            stroke-dashoffset: 0
}
</style>
