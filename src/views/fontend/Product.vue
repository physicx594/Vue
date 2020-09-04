<template>
  <div class="Product">
    <Loading :active.sync="isLoading"></Loading>
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
            <div class="title "> <h2>{{ tempProduct.title}}</h2></div>
            <div class="content">{{ tempProduct.content}}</div>
            <div class="origin_price text-muted text-right" v-if="tempProduct.origin_price"> <del>{{ tempProduct.origin_price | filter }}</del></div>
            <div class="d-flex justify-content-between">
              <div class="heavy">商品重量: 160克  ± 10%</div>
              <div class="price h4 font-weight-bold text-right" v-if="tempProduct.price"> {{tempProduct.price | filter}}</div>
            </div>
            <div class="shipping">
              <div>全店，常溫 滿 1000 免運 </div>
              <div>全店，冷凍 滿 3000 免運</div>
            </div>
            <div class="d-flex justify-content-between footer">
              <div class="input-group bg-dark">
                <div class="input-group-prepend">
                  <button type="button" class="btn btn-outline-brown text-white border-0 p-0" @click="tempProduct.quantity --"
                  :disabled="tempProduct.quantity === 1">
                    -
                  </button>
                </div>
                <input type="number" class="form-control bg-dark py-0 border-0 text-center text-white" v-model="tempProduct.quantity" disabled min="1">
                <div class="input-group-append">
                  <button type="button" class="btn btn-outline-brown text-white border-0 p-0" @click="tempProduct.quantity ++">
                    +
                  </button>
                </div>
              </div>
              <button type="button" class="btn btn-brown cartBtn" @click="addToCart(tempProduct)">加入購物車</button>
            </div>
          </div>
        </div>
        <div class="col-md-12 mt-5">
          <div class="productImg">
            <!-- <img src="../../assets/Images/product/cooking.png" class="img-fluid" width="800"> -->
            <img src="../../assets/Images/product/2.png" class="img-fluid" width="800">
            <img src="../../assets/Images/product/7.png" class="img-fluid" width="800">
            <img src="../../assets/Images/product/4.jpg" class="img-fluid" width="800">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Breadcrumb from '@/components/Breadcrumb'
export default {
  name: 'Product',
  components: {
    Breadcrumb
  },
  data () {
    return {
      tempProduct: {},
      selectPic: '',
      isLoading: false
    }
  },
  methods: {
    addToCart (item, quantity = 1) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`
      const cart = {
        product: item.id,
        quantity
      }
      this.axios.post(api, cart)
        .then((res) => {
          this.$bus.$emit('get-cart')
          this.isLoading = false
        })
        .catch(error => {
          this.isLoading = false
          console.log(error)
        })
    }
  },
  created () {
    const { id } = this.$route.params
    const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/product/${id}`
    this.axios.get(api)
      .then(res => {
        this.tempProduct = {
          ...res.data.data,
          quantity: 1
        }
        this.selectPic = this.tempProduct.imageUrl[0]
      })
      .catch(error => {
        console.log(error)
      })
  }
}
</script>

<style lang="scss">
.Product{
  .row{
    padding: 0 70px;
    .pics{
      display: flex;
      justify-content: space-between;
      width: 100%;
      height: 350px;
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
  }
  .productInfo{
    position: relative;
    height: 100%;
    .footer{
      width: 100%;
      position: absolute;
      bottom: 0;
      .cartBtn{
        color: white;
        &:hover{
          background: white;
          color: #de9e36;
        }
      }
    }
    .input-group, .cartBtn{
        width: 45%;
        border-radius: 50px;
      .btn{
        width: 30px;
        font-size: 26px;
      }
      .input-group-prepend .btn{
        border-top-left-radius: 50px;
        border-bottom-left-radius: 50px;
      }
      .input-group-append .btn{
        border-top-right-radius: 50px;
        border-bottom-right-radius: 50px;
      }
    }
  }
  .productImg{
    img{
      object-fit: cover;
      object-position: center center;
    }
  }
}
</style>
