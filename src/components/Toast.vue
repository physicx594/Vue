<template>
    <div style="position: fixed; left: 50%; min-width: 300px; z-index: 11000; transform: translate(-50%);
">
    <div class="toast mt-3 animate__animated" :class="animate" role="alert" aria-live="assertive" aria-atomic="true" id="toast" data-autohide="false">
        <div class="toast-body text-center" >
            <span class="spinner-grow spinner-grow-sm text-success mr-2"></span>{{message}}
        </div>
    </div>
    </div>
</template>

<script>
/* global $ */

export default {
  data () {
    return {
      animate: {
        animate__fadeInDownBig: false,
        animate__fadeOutUp: false
      },
      message: '123'
    }
  },
  created () {
    this.$bus.$on('message', (str) => {
      this.animate.animate__fadeInDownBig = true
      $('#toast').toast('show')
      this.message = str
      setTimeout(() => {
        this.animate.animate__fadeInDownBig = false
        this.animate.animate__fadeOutUp = true
        setTimeout(() => {
          this.animate.animate__fadeOutUp = false
          $('#toast').toast('hide')
        }, 2000)
      }, 2000)
    })
  }
}
</script>

<style lang="scss">

</style>
