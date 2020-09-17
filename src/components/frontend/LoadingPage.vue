<template>
  <div class="LoadingPage">
    <div class="loading" :class="{ 'open': isLoading }" >
      <div class="section">
        <span>Healthy Diet</span>
        <p class="m-0">Welcome!</p>
        <p>｜新鮮沙拉｜健康餐盒｜舒肥系列｜</p>
        <div class="loader">
          <svg version="1.1" id="Layer_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
            width="24px" height="30px" viewBox="0 0 24 30" style="enable-background:new 0 0 50 50;" xml:space="preserve">
            <rect x="0" y="13" width="4" height="5" fill="#333">
              <animate attributeName="height" attributeType="XML"
                values="5;21;5"
                begin="0s" dur="0.6s" repeatCount="indefinite" />
              <animate attributeName="y" attributeType="XML"
                values="13; 5; 13"
                begin="0s" dur="0.6s" repeatCount="indefinite" />
            </rect>
            <rect x="10" y="13" width="4" height="5" fill="#333">
              <animate attributeName="height" attributeType="XML"
                values="5;21;5"
                begin="0.15s" dur="0.6s" repeatCount="indefinite" />
              <animate attributeName="y" attributeType="XML"
                values="13; 5; 13"
                begin="0.15s" dur="0.6s" repeatCount="indefinite" />
            </rect>
            <rect x="20" y="13" width="4" height="5" fill="#333">
              <animate attributeName="height" attributeType="XML"
                values="5;21;5"
                begin="0.3s" dur="0.6s" repeatCount="indefinite" />
              <animate attributeName="y" attributeType="XML"
                values="13; 5; 13"
                begin="0.3s" dur="0.6s" repeatCount="indefinite" />
            </rect>
          </svg>
        </div>
     </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ['isLoading'],
  data () {
    return {
    }
  }
}
</script>

<style lang="scss">
$primary : #204969;
$secondary: #de9e36;
$bgD:#CED4DA;
$bgL:#F7F7F7;

.LoadingPage{
  .loading{
    display: none;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background: $primary;
    z-index: 2000;
    &.open{
    display: block
    }
    .section{
      position: absolute;
      top: 43%;
      left: 50%;
      transform: translate(-50%,-43%);
      color: $secondary;
      font-weight: 900;
      span{
        position: relative;
        font-family: 'Yellowtail', cursive;
        font-size: 40px;
        font-weight: bold;
        color: #fff;
        &::after{
          content: '™';
          font-family: 'Noto Sans TC';
          font-size: 12px;
          position: absolute;
          top: 0;
          right: -20px;
        }
      }
      svg path,
      svg rect{
        fill: $secondary;
      }
    }
  }
}
</style>
