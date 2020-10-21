<template>
  <div class="Products" :class="{high: this.$route.params.category}">
    <Navbar></Navbar>
    <Gotop></Gotop>
    <div v-if="!$store.state.isLoading">
      <Banner :pageName="'Products List'" :content="'享受疏食的喜悅與美好'"></Banner>
      <div class="container mt-5">
        <div class="ProductsRow row">
          <div class="navigationBar">
              <ul class="list-unstyled my-2">
                <li @click="category='全部商品'"><button class="btn" :class="{active:category==='全部商品'}">全部商品</button> </li>
                <li @click="category = '新鮮沙拉'"><button class="btn" :class="{active:category==='新鮮沙拉'}">新鮮沙拉</button></li>
                <li @click="category='健康餐盒'"><button class="btn" :class="{active:category==='健康餐盒'}">健康餐盒</button></li>
                <li @click="category='舒肥系列'"><button class="btn" :class="{active:category==='舒肥系列'}">舒肥系列</button></li>
              </ul>
          </div>
          <div class="col-md-12">
            <div class="row justify-content-start" >
              <div class="circle col-md-6 col-lg-4" v-for="(item, index) in filtedProducts" :key="index" >
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
          </div>
        <Pagination :pages="pagination" @update="getProducts"></Pagination>
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
import Navbar from '@/components/frontend/Navbar'
import Banner from '@/components/frontend/Banner'
import Footer from '@/components/frontend/Footer'

export default {
  components: {
    Navbar,
    Banner,
    Footer
  },
  data () {
    return {
      category: '全部商品',
      randomItem: []
    }
  },
  methods: {
    getProducts (page = 1) {
      this.$store.dispatch('getProducts')
    },
    addToCart (item, quantity = 1) {
      this.$store.dispatch('addToCart', { item, quantity })
    }
  },
  computed: {
    filtedProducts () {
      if (this.category === '全部商品') return this.products
      return this.products.filter(item => this.category === item.category)
    },
    products () {
      return this.$store.state.products
    },
    pagination () {
      return this.$store.state.pagination
    },
    openMsg () {
      return this.$store.state.openMsg
    },
    joinMsg () {
      return this.$store.state.joinMsg
    }
  },
  created () {
    this.getProducts()
  }
}
</script>
