<template>
  <div class="CheckoutPay" >
    <Navbar></Navbar>
    <div class="container" v-if="!$store.state.isLoading">
        <div class="row">
          <CheckoutNav :step1="step" :step2="step" :step3="step"></CheckoutNav>
          <div class="cartList p-3">
            <div class="text-center">
              <div v-if="tempProduct.total">合計{{ tempProduct.total | money }}</div>
              <span style="font-size:13px" v-if="tempProduct.products">購物車({{ tempProduct.products.length }}件)</span>
              <span class="arrowDown" @click="open = !open"><i class="fa fa-angle-down text-danger" :class="{open: open}" ></i></span>
            </div>
          </div>
          <div class="opensection w-100" :class="{open: open}">
              <table class="table mb-0 table-borderless border border-top-0" >
                  <thead class="table">
                      <tr scope="row" >
                      <th></th>
                      <th>品名</th>
                      <th>單價</th>
                      <th>小計</th>
                    </tr>
                  </thead>
                  <tbody>
                      <tr scope="row" v-for="(item, index) in tempProduct.products" :key="index">
                      <td class="pic"><img :src="item.product.imageUrl[0]" class="img-fluid"></td>
                      <td>{{ item.product.title }}</td>
                      <td >x{{ item.qty }}</td>
                      <td v-if="item.product.price">{{ item.product.price * item.qty | money }}</td>
                      </tr>
                  </tbody>
                  <tfoot>
                    <tr>
                      <td colspan="2" class="text-right" ><i class="fa fa-angle-up fa-2x text-danger" @click="open = !open"></i></td>
                      <th>合計</th>
                      <th class="text-danger" v-if="tempProduct.total">{{ tempProduct.total | money }}</th>
                    </tr>
                  </tfoot>
              </table>
          </div>
          <div class="orderInfo mt-5">
            <div class="header">訂單資訊 <h6 class="float-right pt-1" v-if="tempProduct.id">{{ tempProduct.id | orderId}}</h6></div>

              <table class="table m-0">
                <tbody v-if="tempProduct.user">
                  <tr>
                    <td>姓名</td>
                    <td >{{ tempProduct.user.name }}</td>
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
                    <td class="text-danger font-weight-bold">{{ tempProduct.is_paid }}</td>
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

export default {
  name: 'CheckoutPay',
  components: {
    Navbar,
    Footer,
    CheckoutNav
  },
  data () {
    return {
      tempProduct: {},
      step: true,
      open: false
    }
  },
  methods: {
    getOrder (id) {
      console.log(id)
      this.$store.dispatch('updateLoading', true)
      const api = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_UUID}/order/${id}`
      this.axios.get(api)
        .then(res => {
          this.tempProduct = res.data.order
          if (this.tempProduct.is_paid === false) {
            this.tempProduct.is_paid = '未付款'
          } else {
            this.tempProduct.is_paid = '已付款'
          }
          this.$store.dispatch('getCart')
          this.$store.dispatch('updateLoading', false)
        })
        .catch(res => {
          console.log(res)
          this.$store.dispatch('updateLoading', false)
        })
    },
    getOrders () {
      const api = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_UUID}/orders`
      this.axios.get(api)
        .then(res => {
          // this.tempProduct = res.data.data
          console.log(res)
        })
    },
    paying () {
      const orderId = this.tempProduct.id
      const api = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_UUID}/pay/${orderId}`
      this.axios.post(api)
        .then(res => {
          console.log(res)
          this.getOrder(orderId)
        })
    }
  },
  computed: {
    isLoading () {
      return this.$store.state.isLoading
    }
  },
  created () {
    this.$store.dispatch('updateLoading', true)
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
      position: relative;
      width: 100%;
      border: 1px solid #EDEDED;
      .arrowDown{
        position: absolute;
        top: 50%;
        left: 56%;
        transform: translateY(-50%);
        padding: 20px;
        cursor: pointer;
        i{
          transition: .5s;
          &.open{
            transition: .5s;
            transform: rotate(180deg);
          }
        }
      }
    }

    .opensection{
      height: 0px;
      overflow: hidden;
      transition: all .5s ease-out;
      table{
        font-size: 16px;
        tr{
          border-bottom: 1px solid #EDEDED;
                    position: relative;
          .fa-angle-up{
            margin-right: 90px;
            left: 50%;
            cursor: pointer;
          }
        }
        img{
          width: 80px;
          height: 80px;
        }
      }
      &.open{
        height: 529px;
      }
    }
    .orderInfo{
      position: relative;
      width: 100%;
      margin: 0 auto 96px;
      border: 1px solid #EDEDED;
      font-size: 13px;
      .form-control-plaintext{
        border-bottom: 1px solid #000;
      }
      .pay{
        position: absolute;
        right: 0;
        bottom: -43px;
      }
      table{
        opacity: 1;
      }
    }
}

</style>
