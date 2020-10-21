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
      selectPic: ''
    }
  },
  methods: {
    addToCart (item, quantity = 1) {
      this.$store.dispatch('addToCart', { item, quantity })
    }
  },
  computed: {
    openMsg () {
      return this.$store.state.openMsg
    },
    joinMsg () {
      return this.$store.state.joinMsg
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
