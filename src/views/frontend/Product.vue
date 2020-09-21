<template>
  <div class="Product">
    <Navbar></Navbar>
    <LoadingPage :isLoading="isLoading"></LoadingPage>
    <Breadcrumb :product="tempProduct"></Breadcrumb>
    <div class="container">
      <div class="row">
        <div class="col-md-7">
          <div class="pics">
            <img class="show-pic" :src="selectPic" alt="">
            <div class="other-pic">
              <figure v-for="(img, key) in tempProduct.imageUrl" :key="tempProduct.id + key">
                <img  :src="img" @click="selectPic = img">
              </figure>
            </div>
          </div>
        </div>
        <div class="col-md-5">
          <div class="productInfo text-left">
            <div class="title"><h2 class="font-weight-bold">{{ tempProduct.title }}</h2></div>
            <!-- <div class="content">{{ tempProduct.description}}</div>
            <div class="content">{{ tempProduct.content}}</div> -->
            <div class="price">
              <div class=" h2 font-weight-bold m-0" v-if="tempProduct.price"> {{tempProduct.price | money }}  <span class="sale">sale</span> </div>
              <div class="origin_price text-muted font-italic" v-if="tempProduct.origin_price"> <del>{{ tempProduct.origin_price | money }}</del></div>
            </div>
            <div class="content" style="font-size:13px">{{ tempProduct.content }}</div>
            <div class="promotions">
              <p class="mb-1">雙十節9 折優惠碼 : <span>taiwan1010</span></p>
              <p class="m-0">周年慶，全館滿<span>3000免運費</span></p>
            </div>
            <div class="d-flex justify-content-between footer">
              <div class="input-group">
                <div class="input-group-prepend">
                  <button type="button" class="btn text-white p-0" @click="tempProduct.quantity --"
                  :disabled="tempProduct.quantity === 1" :class="{ stop:tempProduct.quantity === 1 }">
                    <i class="fas fa-minus" style="font-size:16px"></i>
                  </button>
                </div>
                <input type="text" class="form-control" v-model="tempProduct.quantity" disabled min="1">
                <div class="input-group-append">
                  <button type="button" class="btn  text-white p-0" @click="tempProduct.quantity ++">
                    <i class="fas fa-plus" style="font-size:16px"></i>
                  </button>
                </div>
              </div>
              <button type="button" class="btn cartBtn" @click="addToCart(tempProduct)">加入購物車</button>
            </div>
          </div>
        </div>
        <div class="productDetail col-md-12">
          <div class="sectionTitle h3 my-5"><span>商品描述</span></div>
          <div class="section d-flex">
            <div class="description p-0" >{{ tempProduct.description }}</div>
            <!-- <div class="content col-md-6 p-0">{{ tempProduct.content }}</div> -->
          </div>
        </div>
        <!-- <div class="my-5">
          <div class="productImg">
            <img src="@/assets/Images/product/itemDetail-3big.png" class="img-fluid">
          </div>
        </div> -->
        <div class="relateItem">
          <div class="sectionTitle h3 my-5"><span>你可能會喜歡</span></div>
          <Swiper ref="mySwiper" :options="swiperOptions" class="swiper my-5">
            <SwiperSlide v-for="(item, index) in randomItems" :key="index"><figure><img :src="item.imageUrl[0]" alt=""></figure></SwiperSlide>
            <div class="swiper-pagination" slot="pagination"></div>
            <div class="swiper-button-prev" slot="button-prev"></div>
            <div class="swiper-button-next" slot="button-next"></div>
          </Swiper>
        </div>
      </div>
    </div>

    <div class="joinMsg px-5" :class="{ open: openMsg }" v-if="joinMsg">
      <span >成功加入購物車</span>
    </div>
    <div class="joinMsg bg-danger" :class="{ open: openMsg }" v-else>
      <span>該商品已放入購物車當中，</span><br>
      <span>請至購物車修改數量即可。</span>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '@/components/frontend/Navbar'
import Footer from '@/components/frontend/Footer'
import Breadcrumb from '@/components/frontend/Breadcrumb'
import LoadingPage from '@/components/frontend/LoadingPage'
import { Swiper, SwiperSlide } from 'vue-awesome-swiper'
import 'swiper/css/swiper.css'

export default {
  name: 'Product',
  components: {
    Navbar,
    Footer,
    Breadcrumb,
    LoadingPage,
    Swiper,
    SwiperSlide
  },
  data () {
    return {
      randomItems: [],
      tempProduct: {},
      selectPic: '',
      isLoading: false,
      openMsg: false,
      joinMsg: true,
      swiperOptions: {
        speed: 1500,
        slidesPerView: 4,
        spaceBetween: 10,
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
        }
        // breakpoints: {
        //   1024: {
        //     slidesPerView: 4,
        //     spaceBetween: 40
        //   },
        //   768: {
        //     slidesPerView: 3,
        //     spaceBetween: 30
        //   },
        //   640: {
        //     slidesPerView: 2,
        //     spaceBetween: 20
        //   },
        //   320: {
        //     slidesPerView: 1,
        //     spaceBetween: 10
        //   }
        // }
      }
    }
  },
  methods: {
    addToCart (item, quantity = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`
      const cart = {
        product: item.id,
        quantity
      }
      this.axios.post(api, cart)
        .then((res) => {
          this.$bus.$emit('get-cart')
          this.openMsg = true
          setTimeout(() => {
            this.openMsg = false
          }, 2500)
        })
        .catch(error => {
          this.openMsg = true
          this.joinMsg = false
          setTimeout(() => {
            this.openMsg = false
            this.joinMsg = true
          }, 2500)
          console.log(error)
        })
    },
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
    this.isLoading = true
    const { id } = this.$route.params
    const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/product/${id}`
    this.axios.get(api)
      .then(res => {
        this.tempProduct = {
          ...res.data.data,
          quantity: 1
        }
        this.selectPic = this.tempProduct.imageUrl[0]
        this.isLoading = false
      })
      .catch(error => {
        console.log(error)
      })
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

.Product{
  .NavBar{
    position: sticky;
  }
  .sectionTitle{
    font-weight: bold;
    color: $primary;
    span{
      position: relative;
      &::before{
        position: absolute;
        bottom: 0;
        transform: translateX(50%);
        content: "";
        width: 50%;
        height: 2px;
        background: $primary;
        margin-bottom: -10px;
      }
    }
  }
  .joinMsg{
    position: fixed;
    top: 103px;
    right: -350px;
    padding: 5px 10px;
    color: white;
    background: $primary;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.06);
    transition: all 0.5s ease-out;
    font-size: 13px;
    &.open{
      right: 10px;
    }
  }
  .pics{
    display: flex;
    justify-content: space-between;
    width: 100%;
    height: 350px;
    overflow: hidden;
    .show-pic{
      width: 80%;
      height: 100%;
      object-fit: cover;
      object-position: center center;
    }
    .other-pic{
      width: 18%;
      figure{
        width: 100%;
        height: 80px;
        margin-bottom: 10px;
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center center;
        }
      }
    }
  }
  .productInfo{
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 100%;
    .sale{
      font-size: 12px;
      font-weight: 300;
      padding: 0px 5px;
      border-radius: 10px;
      background: $contrast;
      color: white;
    }
    .promotions>p{
      border-left: 3px solid #CED4DA;
      padding-left: 5px;
      &>span{
        color:$contrast;
        font-weight: bold;
        font-size: 18px;
        margin-left: 5px;
      }
    }
    .footer{
      width: 100%;
      .cartBtn{
        color: white;
        border: 1px solid transparent;
        background: $primary;
        &:hover{
          background: #1b381b;
        }
      }
    }
    .input-group, .cartBtn{
      width: 45%;
      border-radius: 50px;
      box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.06);
      .btn{
        width: 30px;
        i{
        color: $primary;
        }
        &.focus, &:focus {
          box-shadow: none;
        }
      }
      input{
        background: #F7F7F7;
        border: none;
        height: 100%;
        color: $primary;
        text-align: center;
        font-weight: bolder;
        font-size: 28px;
        font-family: 'sans-serif';
        padding: 0;
      }
       .btn:active{
        animation: btn 1s infinite linear;
        border-bottom-left-radius: 50px;
      }
      .btn.stop:active{
        animation: none;
      }
      @keyframes btn {
        25% {
          transform: translateY(-10px);
        }
      }
    }
  }
  .productDetail{
    .section{
      white-space: pre-wrap;
      text-align: center;
      line-height: 30px;
      background: #F7F7F7;
      padding: 20px 40px;
      .description{
        width: 100%;
      }
    }
  }
  .productImg{
    // background: url('../../assets/Images/product/itemDetail-3big.png') center center no-repeat;
    // background-size: cover;
    // width: 100%;
    // min-height: 600px;
    // background-attachment: fixed;
    img{
      object-fit: cover;
      object-position: center center;
    }
  }
  .relateItem{
    width: 100%;
    padding: 0 15px;
    .swiper {
      height: 277.5px;
      width: 100%;
      padding-bottom:  50px;
      position: relative;
      // overflow: hidden;
      .swiper-wrapper{
                  // overflow: hidden;

        // width: 80%;
        // padding: 0 15px;
        .swiper-slide {
          // margin-right: 0;
          // display: flex;
          // justify-content: center;
          // align-items: center;
          // text-align: center;
          // font-weight: bold;
          // background-color: $primary;
          figure{
            width: 100%;
            height: 100%;
            border-radius: 50%;
            overflow: hidden;
            cursor: pointer;
            img{
              width: 100%;
              height: 100%;
              object-fit: cover;
            }
          }
        }
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
  }
}
</style>
