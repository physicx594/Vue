<template>
    <div class="banner mb-5">
        <div class="section">
            <div class="pageName">{{ pageName }}</div>
            <span class="content">{{ content }}</span>
        </div>
        <div id="section03" class="demo arrowDown">
            <a href="#" @click.prevent="scrollDown"><span></span>Scroll</a>
        </div>
    </div>
</template>

<script>
export default {
  props: ['pageName', 'content'],
  methods: {
    scrollDown () {
      window.scrollTo({
        top: 561,
        behavior: 'smooth'
      })
    }
  }
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
    .arrowDown{
        position: absolute;
        bottom: 5%;
        left: 50%;
        transform: translateX(-50%);
        a {
            color: $primary;
            padding: 50px;
            span{
                position: absolute;
                left: 50%;
                top: -50px;
                width: 24px;
                height: 24px;
                border-left: 5px solid $primary;
                border-bottom: 5px solid $primary;
                -webkit-transform: rotate(-45deg);
                transform: translateX(-50%) rotate(-45deg);
                box-sizing: border-box;
                animation: scroll 1s linear infinite ;
                @keyframes scroll {
                    25% {
                        transform: translate(-50%, 5px) rotate(-45deg);
                    }
                    50%{
                        transform: translate(-50%, 0) rotate(-45deg);
                    }
                    75% {
                        transform: translate(-50%, -5px) rotate(-45deg);
                    }
                    100% {
                        transform: translate(-50%, 0) rotate(-45deg);
                    }
                }
            }
        }
    }
}

</style>
