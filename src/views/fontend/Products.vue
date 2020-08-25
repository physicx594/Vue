<template>
  <div class="Products">
    <Loading :active.sync="isLoading"></Loading>
    <div class="banner">
      <img src="https://images.unsplash.com/photo-1498837167922-ddd27525d352?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80">
    </div>
    <div class="container mt-5">
      <div class="ProductsRow row">
        <div class="sideBar col-md-2 p-0">
          <ul class="list-unstyled">
            <li><router-link to="/" class="current">新品上市</router-link></li>
            <li><router-link to="/">人氣商品</router-link></li>
            <li><router-link to="/">舒肥系列</router-link></li>
            <li><router-link to="/">沙拉</router-link></li>
          </ul>
        </div>
        <div class="col-md-10">
          <div class="row justify-content-around m-0">
            <div class="card mb-4 p-0" v-for="(item, index) in products" :key="index">
              <div class="card_img">
                  <figure><img  :src="item.imageUrl[0]" class="img-fluid"></figure>
              </div>
              <div class="card_body px-2">
                  <div class="description text-left">
                      <h5 class="title card-title text-center text-brown">{{item.title}}</h5>
                      <h6 class="card-subtitle">{{item.category}}</h6>
                  </div>
                  <div class="money text-right">
                  <div v-if="!item.price">
                      <div style=" visibility:hidden">0</div>
                      <div class="origin_price text-decoration-none text-danger"><h5>{{item.origin_price | filter}}</h5></div>
                      </div>
                      <div v-else>
                          <div class="origin_price"><del>{{item.origin_price | filter}}</del></div>
                          <div class="price"><h5>{{item.price | filter}}</h5></div>
                      </div>
                  </div>
              </div>
              <div class="card-footer">
                  <button class="btn detail btn-outline-dark float-left" @click.prevent="openProductModal(item), status=(item.id)" :disabled="status === item.id">詳細資料
                      <span class="spinner-border spinner-border-sm" v-if="status === item.id"></span>
                  </button>
                  <button href="#" class="btn addCart btn-dark float-right" @click="addToCart(item);status=(item.id)" :disabled="status === item.id">加入購物車
                      <span class="spinner-border spinner-border-sm" v-if="status === item.id"></span>
                  </button>
              </div>
            </div>
          </div>
          <Pagination :pages="pagination" @update="getProducts"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */

export default {
  name: 'Products',
  props: ['user'],

  data () {
    return {
      isLoading: false,
      status: {},
      products: [],
      pagination: {}
    }
  },
  methods: {
    getProducts () {
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products`
      this.axios.get(api)
        .then(res => {
          this.products = res.data.data
          this.pagination = res.data.meta.pagination
        })
        .catch(res => {
          console.log(res)
        })
    },
    addToCart (item, quantity = 1) {
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`
      const cart = {
        product: item.id,
        quantity
      }
      this.axios.post(api, cart)
        .then((res) => {
          this.status = {}
          $('#productModal').modal('hide')
          $('#successCart').modal('show')
          setTimeout(() => {
            $('#successCart').modal('hide')
          }, 1000)
          this.getProducts()
        })
        .catch(error => {
          this.status = {}
          this.status.cart = error.response.data.errors[0]
          $('#productModal').modal('hide')
          $('#successCart').modal('show')
          setTimeout(() => {
            $('#successCart').modal('hide')
          }, 1000)
        })
    },
    openProductModal (item) {
      this.$bus.$emit('productDetail', item)
    }
  },
  created () {
    this.getProducts()
    this.$bus.$on('productDetailAddToCart', (item) => {
      this.addToCart(item, item.quantity)
    })
    this.$bus.$on('productStatus', (item) => {
      this.status = {}
    })
  }
}
</script>

<style lang="scss">
$main: #de9e36;
$dark: #474747;

.Products{
  .banner{
    img{
        width: 100%;
        height: 400px;
        object-position: center center;
        object-fit: cover;
        opacity: 0.65;
    }
  }
  .ProductsRow{
    .sideBar{
      ul{
        li{
          a{
            display: block;
            text-decoration: none;
            padding: 10px;
            color: $dark;
            font-weight: bold;
          }
          .current, a:hover{
            color: white;
            background-color: $dark;
            border-left: 5px solid $main;
          }
        }
      }
    }
    .card{
      width: 30%;
      border-radius: unset;
      &:hover{
        box-shadow: 2px 1px 10px 1px rgba(0, 0, 0, 0.349);
        transform: scale(1.005);
      }
    }
  }
  .Pagination ul{
    justify-content: center;
  }
}
</style>
