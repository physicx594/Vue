<template>
    <div class="banner mb-5">
        <div class="section">
            <div class="pageName">{{ pageName }}</div>
            <span class="content">{{ content }}</span>
        </div>
    </div>
</template>

<script>
export default {
  props: ['pageName', 'content']

}
</script>

<style lang="scss">
$primary : #2e4e18;
$secondary: #FEC81A;
$contrast: #800000;
$bgD:#CED4DA;
$bgL:#F7F7F7;

  .banner {
    width: 100%;
    height: 100vh;
    background-attachment: fixed;
    background-size: cover;
    .section {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(
        225deg,
        #ffe29f 0%,
        #ffa99f 48%,
        #ff719a 100%
      );
      background-clip: text;
      color: transparent;
      animation: title 1.5s 1 ease-out forwards;
      & .pageName{
        font-family: 'Yellowtail', cursive;
        font-size: 80px;
        font-weight: bold;
        color: $primary;
        padding-right: 20px;
      }
      & .content{
        padding: 0px 20px;
        border: 1px solid $primary;;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.06);
        font-size: 24px;
        font-weight: bold;
        color: $primary;;
      }
    }
    @keyframes title {
      0% {
        opacity: 0;
        transform: translate(-50%, -80%);
      }
      100% {
        opacity: 1;
        transform: translate(-50%, 0%);
      }
    }
  }

</style>
