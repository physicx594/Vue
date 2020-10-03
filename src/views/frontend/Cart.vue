<template>
  <div class="Cart">
    <Navbar></Navbar>
    <div class="container">
        <div class="row">
          <CheckoutNav :step1="step1" ></CheckoutNav>
          <div class="cartContent mb-5">
              <div class="header">購物清單</div>
                <table class="table mb-0 rwd-table">
                  <thead class="table">
                    <tr scope="row" >
                      <th class="pic"></th>
                      <th class="name">品名</th>
                      <th class="price">單價</th>
                      <th class="qty">數量</th>
                      <th class="total">小計</th>
                      <th class="del"></th>
                    </tr>
                  </thead>
                  <tbody>
                      <tr scope="row" v-for="(item, index) in cart" :key="index">
                      <td><img :src="item.product.imageUrl[0]"></td>
                      <td>{{ item.product.title }}</td>
                      <td v-if="!item.product.price">{{ item.product.origin_price | money }}</td>
                      <td v-else>{{ item.product.price | money }}</td>
                      <td>
                          <div class="input-group justify-content-center">
                            <div class="input-group-prepend">
                                <button type="button" class="btn "  @click="item.quantity--;changeQuantity(item)"
                                :disabled="item.quantity === 1 || formLoading === true">-</button>
                            </div>
                            <input type="number" class="form-control col-4 quantity text-center p-0" min= 1  v-model="item.quantity" @change="changeQuantity(item)" >
                            <div class="input-group-append">
                                <button type="button" class="btn" @click="item.quantity+=1;changeQuantity(item)" :disabled="formLoading === true">+</button>
                            </div>
                          </div>
                      </td>
                      <td>{{ item.product.price * item.quantity | money }}</td>
                      <td><button type="button" class="btn delete" @click="delItem(item.product.id)" :disabled="formLoading === true"><i class="far fa-trash-alt"></i></button>
                      </td>
                      </tr>
                  </tbody>
              </table>
              <div class="footer"></div>
          </div>
          <div class="cartSection mb-5">
            <div class="orderForm">
              <div class="header"><span>選擇送貨及付款方式</span></div>
              <form>
                <div class="form-group">
                  <label for="delivery-country">送貨地點</label>
                  <select class="form-control" id="country">
                    <option>台灣</option>
                  </select>
                </div>
                <div class="form-group">
                  <label for="delivery-method">送貨方式</label>
                  <select class="form-control" id="delivery-method">
                    <option>黑貓宅配</option>
                  </select>
                </div>
                <div>
                  <p>全省可宅配，最低訂單量<span class="text-danger">需滿600元</span>才配送(不含運費)，冷凍運費200元，滿3000元即享免運費。</p>
                  <p class="m-0">「冷凍」和「常溫」為不同溫層的商品，無法一起出貨，請分開下單結帳，謝謝！</p>
                </div>
              </form>
            </div>
            <div class="orderSummary">
              <div class="header"  v-if="formLoading === false" >訂單資訊</div>
              <div class="cartload" v-else></div>
              <div class="info">
                <div class="infoSection"> <div>小計:</div><div>{{ totalPrice | money }}</div></div>
                <div class="infoSection">
                  <div v-if="shippingFee===0" class="text-success">滿額免運:</div>
                  <div v-else>運費:</div>
                  <div :class="{'text-success': shippingFee===0}">{{ shippingFee | money }}</div>
                </div>
                <div class="infoSection"><div>折扣碼:</div><div>－{{ discountPrice | money }}</div></div>
                <div class="form-group infoSection">
                  <input type="text" class="form-control" id="coupon"  v-model="couponCode" placeholder="請輸入折扣碼">
                  <button type="button" class="btn btn-success" @click="useCoupon">使用</button>
                </div>
                <div v-if="couponMsg" class="text-danger text-left mb-1">{{ couponMsg }}</div>
                <div class="minimum text-left text-danger" v-if="totalPrice < 600">最低訂單量，需滿600元才配送(不含運費)</div>
              </div>
              <div class="infoCheckout">
                <div class="infoPrice">
                  <div>總計:</div><div class="text-danger">{{ totalPrice + shippingFee - discountPrice | money }}</div>
                </div>
                  <router-link to="/Checkout" class="toCheckout">
                    <button :disabled="totalPrice < 600" type="button" class="btn  btn-success">前往結帳</button>
                  </router-link>
              </div>
            </div>
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
  name: 'Cart',
  components: {
    Navbar,
    Footer,
    CheckoutNav
  },
  data () {
    return {
      cart: [],
      formLoading: false,
      totalPrice: 0,
      discountPrice: 0,
      coupon: {},
      couponCode: '',
      couponMsg: '',
      shippingFee: 200,
      step1: true
    }
  },
  methods: {
    getCart () {
      if (!this.formLoading) this.$store.dispatch('updateLoading', true)
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`
      this.axios.get(api)
        .then((res) => {
          this.$bus.$emit('get-cart')
          this.cart = res.data.data
          this.totalPrice = 0
          this.cart.forEach((item) => {
            this.totalPrice += Number(
              item.product.price * item.quantity || item.product.origin_price * item.quantity
            )
          })
          this.totalPrice > 3000 ? this.shippingFee = 0 : this.shippingFee = 200
          this.$store.dispatch('updateLoading', false)
          this.formLoading = false
        })
    },
    useCoupon () {
      this.formLoading = true
      this.couponMsg = ''
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/coupon/search`
      this.axios.post(api, { code: this.couponCode })
        .then(res => {
          console.log(res)
          this.coupon = res.data.data
          this.discountPrice = Math.floor(this.totalPrice - this.totalPrice * (this.coupon.percent / 100))
          this.formLoading = false
        })
        .catch(error => {
          this.couponMsg = error.response.data.message
          this.discountPrice = 0
          this.couponCode = ''
          this.formLoading = false
        })
    },
    changeQuantity (item) {
      this.formLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`
      const cart = {
        product: item.product.id,
        quantity: item.quantity
      }
      this.axios.patch(api, cart)
        .then((res) => {
          this.getCart()
        })
    },
    delItem (id) {
      this.formLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping/${id}`
      this.axios.delete(api)
        .then((res) => {
          this.getCart()
        })
    }
  },
  watch: {
    cart: {
      handler (value) {
        value.forEach(item => {
          if (item.quantity < 1) item.quantity = 1
        })
      },
      deep: true
    }
  },
  created () {
    this.getCart()
  }
}
</script>

<style lang="scss">
$primary : #2a5529;
$secondary: #FEC81A;
$contrast: #800000;
$bgD:#CED4DA;
$bgL:#F7F7F7;

.Cart{
  font-weight: bold;
  counter-reset: step;
  .cartload{
    width: 100%;
    height: 40px;
    font-size: 17px;
    line-height: 28px;
    padding: 6px 12px;
    text-align: left;
    letter-spacing: 5px;
    background: linear-gradient(45deg,#FEC81A 0%,#FEC81A 20%,#2a5529 20%, #2a5529 45%,#FEC81A 45%,#FEC81A 70%,#2a5529 70%, #2a5529 95%,#FEC81A 95%,#FEC81A 100%);
    background-size:30px 30px;
    background-position:0 0;
    animation:loading 0.5s infinite linear;
    @keyframes loading{
      0%{
        background-position:0 0;
      }
      100%{
        background-position:30px 0;
      }
    }
  }

  .form-control:focus, .btn:focus{
    border: 1px solid #ced4da;
    box-shadow: none;
  }
  .cartContent{
    width: 100%;
    margin: 0 auto;
    border: 1px solid #EDEDED;
    table{
      width: 100%;
      .name, .price, .qty, .total{
        width: 20%;
      }
      .del, .pic{
        width: 10%;
      }
      text-align: center;
      font-size: 13px;
      th{
        border: none;
      }
      td, th{
        padding: 8px;
        img{
          width: 50px;
          height: 50px;
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
        }
        .input-group > .input-group-prepend > .btn{
          border-top-right-radius:0;
          border-bottom-right-radius:0
        }
        .input-group > .input-group-append > .btn{
          border-top-left-radius:0;
          border-bottom-left-radius:0
        }
        .btn{
          border-radius: 50px;
          border: 1px solid $primary;
          color: $primary;
          &:hover{
            background: $primary;
            color: $secondary;
          }
        }
        .delete{
          color: $contrast;
          border: 1px solid $contrast;
          &:hover{
            background: $contrast;
            color: #fff;
          }
        }
      }
    }
  }
  .cartSection{
    width: 100%;
    display: flex;
    justify-content: space-between;
    font-size: 13px;
    .orderForm{
      width: 60%;
      border: 1px solid #EDEDED;
      form{
        padding: 12px;
        text-align: left;
        p{
          border-left: 3px solid #CED4DA;
          padding: 0 5px;
        }
      }
    }
    .orderSummary{
      position: relative;
      width: 35%;
      border: 1px solid #EDEDED;
      height: 300px;
      .info{
        position: relative;
        padding: 8px 10px ;
      border-bottom: 1px solid #EDEDED;
        &Section{
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          input{
            width: 70%;
            &::placeholder{
              font-size: 13px;
            }
          }
          .btn{
            font-size: 13px;
          }
        }
      }
      .infoCheckout{
        width: 100%;
        height: 100%;
        max-height: 75px;
        padding: 8px 10px;
        .infoPrice{
          display: flex;
          justify-content: space-between;
          font-size: 13px;
          position: relative;
          margin-bottom: 5px;
        }
        & .toCheckout .btn{
          width: 100%;
          display: block;
          font-size: 13px;
        }
      }
    }
  }
  @media screen and (max-width: 996px) {
    .cartSection{
      flex-direction: column;
      .orderForm{
        width: 100%;
        margin-bottom: 48px;
      }
      .orderSummary{
        width: 100%;
      }
    }
  }
  @media screen and (max-width: 768px) {

    .cartContent{
      table{
        tbody tr td:nth-child(1), thead tr th:nth-child(1),tbody tr td:nth-child(5), thead tr th:nth-child(5){
          display: none;
        }
        td{
          padding: 8px 5px;
        }
      }
    }
  }
}

</style>
