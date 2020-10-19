<template>
    <div style="position: fixed; left: 50%; min-width: 300px; z-index: 11000; transform: translate(-50%);
">
    <div class="toast mt-3 animate__animated" :class="animate" role="alert" aria-live="assertive" aria-atomic="true" id="toast" data-autohide="false">
        <div class="toast-body bg-danger" v-if="message=== '操作失敗,請檢查'">
            <div class="mr-2"><i class="fas fa-ban fa-2x"></i></div>
            <div style="font-size:20px; font-weight: 700; color: white">{{message}}</div>
        </div>
        <div class="toast-body bg-success" v-else>
            <div class="mr-2"><i class="far fa-check-circle fa-2x" ></i></div>
            <div style="font-size:20px; font-weight: 700; color: white">{{message}}</div>
        </div>
    </div>
    </div>
</template>
<script>
/* global $ */

export default {
  name: 'Toast',
  data () {
    return {
      animate: {
        animate__fadeInDownBig: false,
        animate__fadeOutUp: false
      },
      message: ''
    }
  },
  created () {
    this.$bus.$on('message', (str) => {
      this.animate.animate__fadeInDownBig = true
      $('#toast').toast('show')
      this.message = (str.fail ? str.fail : str)
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
.toast-body{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 350px;
  height: 44px;
  border-radius: 6px;
}
  .fa-check-circle, .fa-ban{
    padding-top: 3px;
    color: white;
  }
</style>
