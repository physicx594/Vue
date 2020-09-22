<template>
  <div class="Cart">
    <Navbar></Navbar>
    <LoadingPage :isLoading='isLoading'></LoadingPage>
    <div class="container">
        <div class="row">
          <CheckoutNav :step1="step1" ></CheckoutNav>
          <div class="cartContent mb-5">
              <div class="header">購物清單</div>
                <table class="table mb-0">
                  <thead class="table">
                      <tr scope="row" >
                      <th></th>
                      <th width="25%">品名</th>
                      <th >單價</th>
                      <th width="30%">數量</th>
                      <th>小計</th>
                      <th ></th>
                    </tr>
                  </thead>
                  <tbody>
                      <tr scope="row" v-for="(item, index) in cart" :key="index">
                      <td><img :src="item.product.imageUrl[0]"></td>
                      <td>{{ item.product.title }}</td>
                      <td v-if="!item.product.price">{{ item.product.origin_price | money }}</td>
                      <td v-else>{{ item.product.price | money }}</td>
                      <td>
                          <div class="input-group">
                          <div class="input-group-prepend">
                              <button type="button" class="btn "  @click="item.quantity--;changeQuantity(item)"
                              :disabled="item.quantity === 1 || isLoading === true">-</button>
                          </div>
                          <input type="number" class="form-control col-4 quantity text-center p-0" min= 1  v-model="item.quantity" @change="changeQuantity(item)" >
                          <div class="input-group-append">
                              <button type="button" class="btn" @click="item.quantity+=1;changeQuantity(item)" :disabled="isLoading === true">+</button>
                          </div>
                          </div>
                      </td>
                      <td>{{ item.product.price * item.quantity | money }}</td>
                      <td><button type="button" class="btn delete" @click="delItem(item.product.id)" :disabled="isLoading === true"><i class="far fa-trash-alt fa-1x"></i></button>
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
                  <p>「冷凍」和「常溫」為不同溫層的商品，無法一起出貨，請分開下單結帳，謝謝！</p>
                </div>
              </form>
            </div>
            <div class="orderSummary">
              <div class="header"  v-if="formLoading === false" >訂單資訊</div>
              <div class="cartload" v-else></div>
              <!-- <div class="cartload" ></div> -->
              <div class="info">
                <div class="infoSection"> <div>小計:</div><div>{{ totalPrice | money }}</div></div>
                <div class="infoSection"> <div>運費:</div><div>{{ shippingFee | money }}</div></div>
                <!-- <div class="infoSection" v-if="totalPrice > 3000"> <div>滿額免運:</div><div>－{{ 200 | money }}</div></div> -->
                <div class="infoSection"> <div>折扣碼:</div><div>－{{ discountPrice | money }}</div></div>
                <div class="form-group infoSection">
                  <input type="text" class="form-control w-75" id="coupon" placeholder="請輸入折扣碼">
                  <button type="button" class="btn">使用</button>
                </div>
                <div class="infoPrice">
                  <div>總計:</div><div>{{ totalPrice + shippingFee | money }}</div>
                </div>
                <div class="minimum" v-if="totalPrice < 600">最低訂單量，需滿600元才配送(不含運費)</div>

                <router-link to="/Checkout" class="toCheckout">
                  <button :disabled="totalPrice < 600" type="button" class="btn">前往結帳</button>
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
import LoadingPage from '@/components/frontend/LoadingPage'

export default {
  name: 'Cart',
  components: {
    Navbar,
    Footer,
    CheckoutNav,
    LoadingPage
  },
  data () {
    return {
      cart: [],
      isLoading: false,
      formLoading: false,
      totalPrice: 0,
      discountPrice: 0,
      shippingFee: 200,
      step1: true
    }
  },
  methods: {
    getCart () {
      if (!this.formLoading) this.isLoading = true
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
          this.isLoading = false
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
  counter-reset: step;
  .cartload{
    width: 100%;
    height: 40px;
    font-size: 17px;
    line-height: 28px;
    padding: 6px 12px;
    text-align: left;
    letter-spacing: 5px;
    background: linear-gradient(45deg,#fc0 0%,#fc0 20%,#000 20%, #000 45%,#fc0 45%,#fc0 70%,#000 70%, #000 95%,#fc0 95%,#fc0 100%);
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
      text-align: left;
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
        .btn{
          border: 1px solid $primary;
          color: $primary;
          font-weight: bold;
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
      .info{
        height: auto;
        padding: 12px;
        &Section{
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
          input::placeholder{
            font-size: 13px;
          }
          .btn{
            width: 20%;
            background: #ced4da;
            color: white;
            font-size: 13px;
          }
        }
        &Price{
          display: flex;
          justify-content: space-between;
          padding: 20px 0 0;
          margin-top: 20px;
          border-top: 1px solid #ced4da;
        }
        & .minimum{
          text-align: left;
          color: red;
        }
        & .toCheckout{
          .btn{
            position: absolute;
            bottom: 12px;
            left: 50%;
            transform: translateX(-50%);
            width: 324px;
            font-size: 13px;
            color: #fff;
            background: $primary;
          }
        }
      }
    }
  }
}

</style>
