<template>
  <div class="Product">
    <Navbar></Navbar>
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
          <div class="productInfo">
            <div class="title"><h2 class="font-weight-bold">{{ tempProduct.title }}</h2></div>
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
          </div>
        </div>
        <div class="relateItem">
          <div class="sectionTitle h3 my-5"><span>你可能會喜歡</span></div>
          <Swiper></Swiper>
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
import Swiper from '@/components/frontend/Swiper'

export default {
  name: 'Product',
  components: {
    Navbar,
    Footer,
    Breadcrumb,
    Swiper
  },
  data () {
    return {
      randomItems: [],
      tempProduct: {},
      selectPic: '',
      openMsg: false,
      joinMsg: true
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
    }
  },
  created () {
    this.$store.dispatch('updateLoading', true)
    const { id } = this.$route.params
    const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/product/${id}`
    this.axios.get(api)
      .then(res => {
        this.tempProduct = {
          ...res.data.data,
          quantity: 1
        }
        this.selectPic = this.tempProduct.imageUrl[0]
        this.$store.dispatch('updateLoading', false)
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
  margin-top: 64px;
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
    text-align: left;
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
      text-align: left;
      line-height: 30px;
      background: #F7F7F7;
      padding: 20px 40px;
      .description{
        width: 100%;
      }
    }
  }
  @media screen and (max-width: 996px) {
    .col-md-5{
      padding: 0;
      font-size: 13px;
      .title h2, .h2{
        font-size: 24px;
      }
    }
  }
  @media screen and (max-width: 991px) {
    .pics{
      flex-direction: column;
      .show-pic{
        width: 100%;
        height: 80%;
      }
      .other-pic{
        width: 100%;
        height: 18%;
        display: flex;
        justify-content: space-between;
        figure {
          width: 70px;
          margin-bottom: 10px;
          &:nth-child(5){
            display: none;
          }
        }
      }
    }
  }

  @media screen and (max-width: 768px) {
      margin-top: 80px;
    .pics .other-pic figure{
      width: 85px;
    }
    .productInfo{
      margin-top: 10px;
      padding: 10px;
      .title h2{
        margin: 0;
      }
      .price, .content, .promotions{
        background: $bgL;
        padding: 10px;
        margin: 5px 0;
      }
      .footer{
        margin-top: 5px;
      }
    }
  }

  @media screen and (max-width: 375px) {
    .pics{
      height: 200px;
      .other-pic figure{
        width: 48px;
      }
    }
    .productInfo {
      .promotions p{
        padding-right: 30%;
      }
      .input-group, .cartBtn{
        width: 45%;
        font-size: 13px;
      }
    }
    .productDetail .section{
      padding: 10px;
    }
  }

  .relateItem{
    width: 100%;
  }
}
</style>
