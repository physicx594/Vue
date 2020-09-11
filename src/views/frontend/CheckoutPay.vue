<template>
  <div class="CheckoutPay">
      <div class="container">
          <div class="row">
            <div class="checkoutNav">
                <div class="step active"><div>購物車</div></div>
                <div class="step active"><div>填寫資料</div></div>
                <div class="step active"><div>訂單確認</div></div>
            </div>
            <div class="cartList">
              <div class="header">購物清單</div>
                <table class="table mb-0 table-borderless">
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
                        <td>{{item.product.title}}</td>
                        <!-- <td v-if="!item.product.price">{{item.product.origin_price | filter}}</td>
                        <td v-else>{{item.product.price | filter}}</td> -->
                        <td>x{{item.quantity}}</td>
                        <td>{{ item.product.price * item.quantity | filter }}</td>
                        </tr>
                    </tbody>
                    <tfoot>
                      <tr>
                      <td colspan="2"></td>
                      <th>總計</th>
                      <th class="text-danger">{{ tempProduct.amount | filter }}</th>
                      </tr>
                    </tfoot>
                </table>
            </div>
            <div class="arrowDown"><i class="fas fa-angle-double-down"></i></div>
            <div class="orderInfo mb-5">
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
  </div>
</template>

<script>
export default {
  data () {
    return {
      tempProduct: {}
    }
  },
  methods: {
    getOrder (id) {
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/orders/6yx3fXo551OlQqRDnxoYaz90tm0IVN0NBmfdYj8Q2k2mOC6QkP0sKcITgNGwBnO7`
      this.axios.get(api)
        .then(res => {
          this.tempProduct = res.data.data
          if (this.tempProduct.paid === false) {
            this.tempProduct.paid = '未付款'
          } else {
            this.tempProduct.paid = '已付款'
          }
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
    this.getOrders()
    this.$bus.$on('orderId', item => {
      this.getOrder(item)
    })
  }
}
</script>

<style lang="scss">
.CheckoutPay{
    counter-reset: step;
    .checkoutNav{
      margin: 30px auto;
      display: flex;
      .step{
          position: relative;
          width: 240px;
          height: 70px;
          color: #CED4DA;
          &::before{
              content:counter(step);
              counter-increment: step;
              display:block;
              color: white;
              width: 25px;
              height: 25px;
              line-height: 25px;
              margin: 5px auto;
              border-radius: 50%;
              background-color: #CED4DA;
          }
          &:first-child:after {
              content:none;
          }
      }
      .step.active{
          color: green;
          &::before{
              background-color: green;
          }
      }
      .step.finished{
          & + .step::after{
              height: 2px;
              background-color: green;
          }
      }
    }
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
          background: #F7F7F7;
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
      margin: 0 auto;
      border: 1px solid #EDEDED;
      .pay{
        position: absolute;
        right: 0;
        bottom: -43px;
      }
    }
}

</style>
