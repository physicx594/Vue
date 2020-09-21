<template>
  <div class="Products" :class="{high: this.$route.params.category}">
    <Navbar></Navbar>
    <LoadingPage :isLoading="isLoading"></LoadingPage>
    <Gotop></Gotop>
    <div v-if="!isLoading">
      <Banner :pageName="'Products List'" :content="'享受疏食的喜悅與美好'"></Banner>
      <div class="container mt-5">
        <div class="ProductsRow row">
          <div class="navigationBar col-md-12">
            <div class="menu w-100">
              <ul class="list-unstyled w-75 my-2">
                <li class="nav-item" @click="category='全部商品'"><button type="button" class="btn" >全部商品</button></li>
                <li @click="category = '新鮮沙拉'"><button type="button" class="btn">新鮮沙拉</button></li>
                <li @click="category='健康餐盒'"><button class="btn">健康餐盒</button></li>
                <li @click="category='舒肥系列'"><button class="btn">舒肥系列</button></li>
              </ul>
            </div>
            <!-- <div>{{ category }}</div> -->
          </div>
          <div class="col-md-12">
            <div class="row justify-content-start p-5" >
              <div class="circle mb-4 col-md-4" v-for="(item, index) in filtedProducts" :key="index" >
                  <figure class="mb-3">
                    <router-link :to="`/product/${item.id}`">
                    <img  :src="item.imageUrl[0]" class="img-fluid"  :data-key = index>
                    <div class="itemPrice">
                      <div v-if="!item.price">
                        <div style=" visibility:hidden">0</div>
                        <div class="origin_price text-decoration-none text-danger"><h5>{{ item.origin_price | money }}</h5></div>
                      </div>
                      <div v-else>
                          <div class="origin_price text-center text-muted"><del>{{ item.origin_price | money }}</del></div>
                          <div class="price text-danger font-weight-bold"><h2>{{ item.price | money }}</h2></div>
                      </div>
                    </div>
                    </router-link>
                  </figure>
                  <h5 class="title text-center mb-3 font-weight-bold">{{ item.title }}</h5>
                  <button class="btn" @click="addToCart(item)">加入購物車</button>
              </div>
            </div>
            <Pagination :pages="pagination" @update="getProducts"></Pagination>
          </div>
        </div>
      </div>
    </div>
    <div class="joinMsg px-5" :class="{open: openMsg}" v-if="joinMsg">
      <span >成功加入購物車</span>
    </div>
    <div class="joinMsg bg-danger" :class="{open: openMsg}" v-else>
      <span>該商品已放入購物車當中，</span><br>
      <span>請至購物車修改數量即可。</span>
    </div>

    <Footer></Footer>
  </div>
</template>
<script>
// /* global $ */
import LoadingPage from '@/components/frontend/LoadingPage'
import Navbar from '@/components/frontend/Navbar'
import Banner from '@/components/frontend/Banner'
import Footer from '@/components/frontend/Footer'

export default {
  name: 'Products',
  components: {
    LoadingPage,
    Navbar,
    Banner,
    Footer
  },
  data () {
    return {
      isLoading: false,
      category: '全部商品',
      products: [],
      pagination: {},
      openMsg: false,
      joinMsg: true,
      randomItem: []
    }
  },
  methods: {
    getProducts (page = 1) {
      if (!this.openMsg) this.isLoading = true
      const params = {
        page,
        paged: '15',
        orderBy: 'created_at, updated_at',
        sort: 'asc' // 排序遞增
      }
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products?page=${params.page}&sort=${params.sort}&paged=${params.paged}`
      this.axios.get(api)
        .then(res => {
          this.products = res.data.data
          this.pagination = res.data.meta.pagination
          if (this.$route.params.category) {
            this.category = this.$route.params.category
            window.scrollTo({
              top: 561,
              behavior: 'smooth'
            })
          }
          this.isLoading = false
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
          this.$bus.$emit('get-cart')
          this.openMsg = true
          this.getProducts()
          setTimeout(() => {
            this.openMsg = false
          }, 2500)
        })
        .catch(error => {
          this.joinMsg = false
          this.openMsg = true
          setTimeout(() => {
            this.openMsg = false
            this.joinMsg = true
          }, 2500)
          console.log(error.response.data.errors[0])
        })
    }
  },
  computed: {
    filtedProducts () {
      if (this.category === '全部商品') return this.products
      return this.products.filter(item => this.category === item.category)
    }
  },
  created () {
    this.getProducts()
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

.Products{
  &.high{
    min-height: 1700px;
  }
  .joinMsg{
    position: fixed;
    top: 71px;
    right: -350px;
    padding: 5px 10px;
    color: white;
    background: #3A602F;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.06);
    transition: all 0.5s ease-out;
    font-size: 13px;
    &.open{
      right: 10px;
    }
  }
  .banner{
    position: relative;
    background: url('https://images.unsplash.com/photo-1543353071-10c8ba85a904?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjI0MX0&auto=format&fit=crop&w=1500&q=80') no-repeat center center;
  }
  .ProductsRow{
    .navigationBar{
      .menu{
        display: flex;
        justify-content: center;
        ul{
          display: flex;
          justify-content: space-between;
          .btn{
            border-radius: 50px;
            color: white;
            background: $primary;
            padding: 5px 30px;
          }
        }
      }
    }
    .circle{
      margin: 50px 0;
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
        background: transparent;
        border: 1px solid $primary;
        color: $primary;
        border-radius: 50px;
        padding: 5px 30px;
        &:hover{
          color: white;
          background: $primary;
        }
      }
    }
  }
  .Pagination {
    border-radius: 50px;
    .page-link {
      color: $primary;
      &:focus {
        box-shadow: none;
      }
    }
    .active .page-link, .page-link:hover {
      color: #fff;
      background-color: $primary;
      border-color: $primary;
    }
    ul{
      justify-content: center;
      margin-bottom: 72px;
    }
  }

}

</style>
