<template>
  <div class="CheckoutPay">
    <Navbar></Navbar>
    <LoadingPage :isLoading="isLoading"></LoadingPage>
    <div class="container" v-if="!isLoading">
        <div class="row">
          <CheckoutNav :step1="step" :step2="step" :step3="step"></CheckoutNav>
          <div class="cartList">
            <div class="header text-center">
              <div>合計{{ tempProduct.amount | money }}</div>
              <span style="font-size:13px">購物車({{ tempProduct.products.length }}件)</span>
            </div>
              <table class="table mb-0 table-borderless">
                <template v-if="true">
                  <thead class="table">
                      <tr scope="row" >
                      <th></th>
                      <th>品名</th>
                      <th >單價</th>
                      <th>小計</th>
                    </tr>
                  </thead>
                  <tbody>
                      <tr scope="row" v-for="(item, index) in tempProduct.products" :key="index">
                      <td><img :src="item.product.imageUrl[0]"></td>
                      <td>{{ item.product.title }}</td>
                      <!-- <td v-if="!item.product.price">{{item.product.origin_price | money}}</td>
                      <td v-else>{{item.product.price | money}}</td> -->
                      <td>x{{ item.quantity }}</td>
                      <td v-if="item.product.price">{{ item.product.price * item.quantity | money }}</td>
                      </tr>
                  </tbody>
                </template>
                  <tfoot>
                    <tr>
                    <td colspan="2"></td>
                    <th>合計</th>
                    <th class="text-danger">{{ tempProduct.amount | money }}</th>
                    </tr>
                  </tfoot>
              </table>
          </div>
          <div class="arrowDown"><i class="fas fa-angle-double-down"></i></div>
          <div class="orderInfo">
            <div class="header">訂單資訊 <h6 class="float-right pt-1">{{ tempProduct.id | orderId}}</h6></div>
              <table class="table m-0">
                <tbody>
                  <tr>
                    <td>姓名</td>
                    <td>{{ tempProduct.user.name }}</td>
                  </tr>
                  <tr>
                    <td>電話</td>
                    <td>{{ tempProduct.user.tel }}</td>
                  </tr>
                  <tr>
                    <td>Email</td>
                    <td>{{ tempProduct.user.email }}</td>
                  </tr>
                  <tr>
                    <td>地址</td>
                    <td>{{ tempProduct.user.address }}</td>
                  </tr>
                  <tr>
                    <td>付款方式</td>
                    <td>{{ tempProduct.payment }}</td>
                  </tr>
                  <tr>
                    <td>付款狀態</td>
                    <td class="text-danger font-weight-bold">{{ tempProduct.paid }}</td>
                  </tr>
                </tbody>
              </table>
              <div class="pay"><router-link to="/CheckoutSuccess"><button  type="button" class="btn btn-success d-block w-100" @click="paying">確定付款</button></router-link></div>
          </div>
        </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from '@/components/frontend/Navbar'
import Footer from '@/components/frontend/Footer'
import CheckoutNav from '@/components/frontend/CheckoutNav'
import LoadingPage from '@/components/frontend/LoadingPage'

export default {
  components: {
    Navbar,
    Footer,
    CheckoutNav,
    LoadingPage
  },
  data () {
    return {
      tempProduct: {},
      isLoading: false,
      step: true
    }
  },
  methods: {
    getOrder (id) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/orders/uuPIle9vZhkmrNTfQDGsvKrE6fCpJX1AVaQ6a3HoRjTmrmtOXkAe8qFBh75VBmS2`
      this.axios.get(api)
        .then(res => {
          this.tempProduct = res.data.data
          if (this.tempProduct.paid === false) {
            this.tempProduct.paid = '未付款'
          } else {
            this.tempProduct.paid = '已付款'
          }
          this.isLoading = false
        })
    },
    getOrders () {
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/orders`
      this.axios.get(api)
        .then(res => {
          // this.tempProduct = res.data.data
          console.log(res)
        })
    },
    paying () {
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/orders/${this.tempProduct.id}/paying`
      this.axios.post(api)
        .then(res => {
          // this.tempProduct = res.data.data
          this.getOrder()
          console.log(res)
        })
    }
  },
  created () {
    this.getOrder()
    this.$bus.$on('orderId', item => {
      this.getOrder(item)
    })
  },
  beforeDestroy () {
    this.$bus.$off('orderId')
  }
}
</script>

<style lang="scss">
.CheckoutPay{
    counter-reset: step;
    .cartList{
      width: 100%;
      border: 1px solid #EDEDED;
      table{
        tr{
          border-bottom: 1px solid #EDEDED;
        }
        tbody td{
          padding: 20px 0;
        }
        tfoot{
          // background: #F7F7F7;
          th{
            height: 40px;
            padding: 0 12px;
          }
        }
        img{
          width: 50px;
          height: 50px;
        }
      }
    }
    .arrowDown{
      width: 100%;
      margin: 0 auto;
    }
    .orderInfo{
      position: relative;
      width: 50%;
      margin: 0 auto 96px;
      border: 1px solid #EDEDED;
      .pay{
        position: absolute;
        right: 0;
        bottom: -43px;
      }
    }
}

</style>
