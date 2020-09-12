<template>
  <div class="Products">
    <Loading :active.sync="isLoading"></Loading>
    <div class="banner"></div>
    <div class="container mt-5">
      <div class="ProductsRow row">
        <!-- <div class="sideBar col-md-2 ">
          <ul class="list-unstyled">
            <li><router-link to="/" class="current"><span>全部商品</span></router-link></li>
            <li><router-link to="/"><span>健康餐盒</span></router-link></li>
            <li><router-link to="/"><span>舒肥系列</span></router-link></li>
            <li><router-link to="/"><span>新鮮沙拉</span></router-link></li>
          </ul>
        </div> -->
        <!-- <div class="navigationBar col-md-12">
          <div class="nav">
            <input type="checkbox">
              <span></span>
              <span></span>
              <div class="menu">
                <li><a href="#">about</a></li>
                <li><a href="#">新鮮沙拉</a></li>
                <li><a href="#">cursos</a></li>
                <li><a href="#">blog</a></li>
                <li><a href="#">contactos</a></li>
              </div>
          </div>
        </div> -->
        <div class="navigationBar col-md-12">
          <div class="menu w-100">
            <ul class="list-unstyled d-flex justify-content-around w-75">
              <li><router-link to="/" class="current"><span>全部商品</span></router-link></li>
              <li><router-link to="/"><span>健康餐盒</span></router-link></li>
              <li><router-link to="/"><span>舒肥系列</span></router-link></li>
              <li><router-link to="/"><span>新鮮沙拉</span></router-link></li>
            </ul>
          </div>
        </div>
        <div class="col-md-12">
          <div class="row justify-content-around p-5" >
            <div class="circle mb-4 col-md-4" v-for="(item, index) in products" :key="index" >
                <figure class="mb-3">
                  <router-link :to="`/product/${item.id}`">
                  <img  :src="item.imageUrl[0]" class="img-fluid">
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
      pagination: {}
    }
  },
  methods: {
    getProducts () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/products`
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
    width: 100%;
    height: 400px;
    background: url('../../assets/Images/product/banner2.png') no-repeat center center;
    background-size: cover;
  }
  .ProductsRow{
    .navigationBar{
      .menu{
        display: flex;
        justify-content: center;
        a{
          // border: 1px solid rgb(28, 91, 103);
          border-radius: 50px;
          // font-weight: bold;
          color: white;
          background: $main;
          box-shadow: 0 8px 10px rgba(0,0,0,.2);
          padding: 5px 10px;
          margin: 0 10px;
        }
      }
    }
    // .navigationBar{
    //     display: flex;
    //     // justify-content: center;
    //     .nav {
    //       position: relative;

    //       // width: 40px;
    //       // height: 40px;
    //       background-color: white;
    //       border-radius: 50px;
    //       box-shadow: 0 8px 15px rgba(0,0,0,.2);
    //       padding: 10px;
    //       transition: 0.5s;
    //       // overflow: hidden;
    //       // justify-content: center;
    //       // align-items: center;
    //       & span {
    //         position: absolute;
    //         left: 20px;
    //         width: 20px;
    //         height: 3px;
    //         border-radius: 50px;
    //         background-color: #666;
    //         pointer-events: none;
    //         transition: 0.5s;
    //         &:nth-child(2) {
    //           transform: translateY(10px);
    //       }
    //       &:nth-child(3) {
    //           transform: translateY(20px);
    //       }
    //     }
    //     & input {
    //         width: 40px;
    //         height: 40px;
    //         cursor: pointer;
    //         opacity: 0;
    //     }
    //     & input:checked ~ .menu {
    //           width: 450px;
    //     }
    //     & input:checked ~ span {
    //         background-color: #f974a1;
    //         &:nth-child(2) {
    //           transform: translateY(20px) rotate(-45deg);
    //       }
    //       &:nth-child(3) {
    //           transform: translateY(20px) rotate(45deg);
    //       }
    //     }
    //   }
    //   .menu {
    //     display: flex;
    //     align-items: center;
    //     justify-content: space-between;
    //       margin: 0;
    //       padding: 0;
    //       width: 0px;
    //       // overflow: hidden;
    //       transition: 0.5s;
    //       background: white;
    //       li {
    //         // display: none;
    //         // overflow: hidden;
    //         list-style: none;
    //         margin: 0 10px;
    //         a {
    //           text-decoration: none;
    //           color: #666;
    //           text-transform: uppercase;
    //           font-weight: 600;
    //           transition: 0.5s;
    //                       width: 150px;

    //           &:hover{
    //             color: #161919;
    //           }
    //       }
    //     }
    //   }
    // }
    .sideBar{
      padding: 10px 0;
      ul{
        li{
          position: relative;
          margin: 0 auto;
          box-sizing: border-box;
          width: 130px;
          height: 40px;
          background-color: white;
          margin-bottom: 15px;
          font-size: 24px;
          text-align: left;
          letter-spacing: 6px;
          line-height: 36px;
          overflow: hidden;
          box-shadow: 4px 5px 12px -10px black;
          &::before {
            content: '';
            position: absolute;
            width: 44px;
            height: inherit;
            background-color: black;
            border-radius: 50%;
            top: 50%;
            left: -18px;
            transform: translate(0, -50%);
            transition: 0.8s ease-out;
          }
          &:hover::before{
            transform: scale(10);
          }
          span{
            color: white;
            mix-blend-mode: difference;
          }
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
      margin: 20px 0;
      justify-content: center;
    }
  }
}
</style>
