<template>
  <div class="Products">
    <Loading :active.sync="isLoading"></Loading>
    <Gotop></Gotop>
    <div class="banner">
      <div class="Slogan" v-if="!isLoading">
        <div class="first">Products List</div>
        <span class="second">享受蔬食的喜悅與美好</span>
      </div>
    </div>
    <div class="container mt-5">
      <div class="ProductsRow row">
        <div class="navigationBar col-md-12">
          <div class="menu w-100">
            <ul class="list-unstyled d-flex justify-content-around w-75">
              <li @click="category = '全部商品'"><a class="btn" >全部商品</a></li>
              <li><button class="btn">新鮮沙拉</button></li>
              <li><button class="btn">健康餐盒</button></li>
              <li><button class="btn">舒肥系列</button></li>
            </ul>
          </div>
        </div>
        <div class="col-md-12">
          <div class="row justify-content-around p-5" >
            <div class="circle mb-4 col-md-4" v-for="(item, index) in products" :key="index" >
                <figure class="mb-3">
                  <router-link :to="`/product/${item.id}`">
                  <img  :src="item.imageUrl[0]" class="img-fluid"  :data-key = index>
                  <!-- <div class="imgHover" >
                    <span @click="openModal(item)">
                      <i class="far fa-heart fa-2x"></i>
                    </span>
                  </div> -->
                  <div class="itemPrice">
                    <div v-if="!item.price">
                      <div style=" visibility:hidden">0</div>
                      <div class="origin_price text-decoration-none text-danger"><h5>{{item.origin_price | filter}}</h5></div>
                    </div>
                    <div v-else>
                        <div class="origin_price text-center text-muted"><del>{{item.origin_price | filter}}</del></div>
                        <div class="price text-danger font-weight-bold"><h2>{{item.price | filter}}</h2></div>
                    </div>
                  </div>
                  </router-link>
                </figure>
                <h5 class="title text-center mb-3">{{item.title}}</h5>
                <button class="btn btn-outline-brown" @click="addToCart(item)">加入購物車</button>
            </div>
          </div>
          <Pagination :pages="pagination" @update="getProducts"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
// /* global $ */

export default {
  name: 'Products',
  props: ['user'],

  data () {
    return {
      isLoading: false,
      products: [],
      pagination: {},
      category: ''
    }
  },
  methods: {
    getProducts (page = 1) {
      this.isLoading = true
      const params = {
        page,
        paged: '9',
        orderBy: 'created_at, updated_at',
        sort: 'asc' // 排序遞增
      }
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products?page=${params.page}&sort=${params.sort}&paged=${params.paged}`
      this.axios.get(api)
        .then(res => {
          this.products = res.data.data
          this.pagination = res.data.meta.pagination
          this.isLoading = false
        })
        .catch(res => {
          console.log(res)
        })
    },
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
          this.getProducts()
        })
        .catch(error => {
          this.isLoading = false
          console.log(error.response.data.errors[0])
        })
    }
  },
  created () {
    this.getProducts()
  }
}
</script>

<style lang="scss">

$main: #de9e36;
$dark: #474747;

.Products{
  .banner{
    background: url('https://images.unsplash.com/photo-1543353071-10c8ba85a904?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjI0MX0&auto=format&fit=crop&w=1500&q=80') no-repeat center center;
  }
  .ProductsRow{
    .navigationBar{
      .menu{
        display: flex;
        justify-content: center;
        .btn{
          border-radius: 50px;
          color: white;
          background: $main;
          box-shadow: 0 8px 10px rgba(0,0,0,.2);
          padding: 5px 10px;
          margin: 0 10px;
        }
      }
    }
    .circle{
      figure{
        position: relative;
        box-sizing: content-box;
        width: 250px;
        height: 250px;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 auto;
        box-shadow: 1px 1px 10px -1px rgba(0, 0, 0, 0.524);
        &:hover img{
          filter:brightness(20%);
        }
        &:hover .imgHover,&:hover .itemPrice{
          opacity: 1;
          color:white
        }
        img{
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: left center;
          transition: 0.3s;
          -webkit-user-drag: none;
        }
        .itemPrice{
          position: absolute;
          left: 50%;
          top:50%;
          transform: translate(-50%, -50%);
          opacity: 0;
          text-align: center;
        }
      }
      .btn{
        border-radius: 50px;
        padding: 5px 10px;
        &:hover{
          color: white;
        }
      }
    }
  }
  .Pagination {
    border-radius: 50px;
    .page-link {
      color: $main;
      &:focus {
        box-shadow: none;
      }
    }
    .active .page-link, .page-link:hover {
      color: #fff;
      background-color: $main;
      border-color: $main;
    }
    ul{
      justify-content: center;
      margin-bottom: 72px;
    }
  }

}

</style>
