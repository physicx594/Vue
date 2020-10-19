<template>
    <Swiper ref="mySwiper" :options="swiperOptions" class="swiper my-5">
        <SwiperSlide v-for="(item, index) in randomItems" :key="index">
            <figure>
                <img :src="item.imageUrl[0]" alt="">
            </figure>
        </SwiperSlide>
        <div class="swiper-pagination" slot="pagination"></div>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
    </Swiper>

</template>

<script>
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'Swiper',
  components: {
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      randomItems: [],
      swiperOptions: {
        speed: 1500,
        slidesPerView: 4,
        spaceBetween: 0,
        slidesPerGroup: 1,
        loop: true,
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          dynamicBullets: true
        },
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev'
        },
        autoplay: {
          delay: 3000
        },
        breakpoints: {
          1024: {
            slidesPerView: 4,
            spaceBetween: 0
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 0
          },
          640: {
            slidesPerView: 2,
            spaceBetween: 20
          },
          320: {
            slidesPerView: 1,
            spaceBetween: 10
          }
        }
      }
    }
  },
  methods: {
    getRandomItem () {
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products`
      this.axios.get(api)
        .then(res => {
          this.randomItems = res.data.data
          this.randomItems = this.randomItems.sort((_a, b) => Math.random() - 0.5)
          this.randomItems = this.randomItems.slice(0, 8)
        })
    }
  },
  created () {
    this.getRandomItem()
  }
}
</script>

<style lang="scss">
$primary : #264710;
$secondary: #FEC81A;
$contrast: #800000;
$bgD:#CED4DA;
$bgL:#F7F7F7;
$dark: #474747;

.swiper {
    position: relative;
    width: 100%;
    height: 275px;
    padding-bottom:  50px;
    .swiper-wrapper{
        .swiper-slide {
          display: flex;
          align-items: center;
            figure{
                width: 100%;
                height: 100%;
                max-width: 200px;
                max-height: 200px;
                border-radius: 50%;
                overflow: hidden;
                margin: 0 auto;
                cursor: pointer;
                img{
                    width: 100%;
                    height: 100%;
                    object-fit: cover;
                }
            }
        }
      @media (max-width: 1024px) {
        .swiper-slide figure{
          max-width: 180px;
          max-height: 180px;
        }
      }
    }
    .swiper-button-prev,
    .swiper-button-next {
        display: inline-block;
        transform: translate(0,-50%);
        box-shadow: 1px 1px 2px 0 rgba(0,0,0,0.2);
        height: 2rem;
        width: 2rem;
        border-radius: 50%;
        text-align: center;
        background: #ffffff;
        opacity: 0.8;
        transition: 0.25s ease-in-out;
    }
    .swiper-button-prev:after,
    .swiper-button-next:after {
        vertical-align: middle;
        text-align: center;
        font-size: 1rem;
        line-height: 2rem;
        color: $primary;
    }
    .swiper-button-prev:hover,
    .swiper-button-next:hover {
        transform: scale(1.2) translateY(-1rem);
        opacity: 1;
        box-shadow: 1px 1px 2px 0.5px rgba(0,0,0,0.3);
    }
    .swiper-button-prev:focus,
    .swiper-button-next:focus {
        outline: none;
    }
    .swiper-button-prev {
        top: 50%;
        left: 2px;
    }
    .swiper-button-next {
        right: 2px;
        top: 50%;
    }
    .swiper-pagination{
        position: absolute;
        bottom: 0px;
        .swiper-pagination-bullet-active{
        width: 10px;
        height: 10px;
        background: $primary;
        }
    }
}

</style>
