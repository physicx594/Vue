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
