<template>
  <div class="banner mb-5">
    <div class="section">
      <div class="pageName">{{ pageName }}</div>
      <span class="content">{{ content }}</span>
    </div>
    <div id="section03" class="demo arrowDown">
      <a href="#" @click.prevent="scrollDown">
        <span></span>Scroll
      </a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['pageName', 'content'],
  methods: {
    scrollDown () {
    //   console.log(window.innerHeight, window.pageYOffset)
      const x = 625
      if (window.innerHeight >= 625) {
        window.scrollTo({
          top: 583 + (window.innerHeight - x),
          behavior: 'smooth'
        })
      } else if (window.innerHeight < 625) {
        window.scrollTo({
          top: 583 - (window.innerHeight - x),
          behavior: 'smooth'
        })
      }
    }
  }
}
</script>
