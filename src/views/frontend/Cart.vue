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
                                <button type="button" class="btn "  @click="changeQuantity(item, item.quantity - 1)"
                                :disabled="item.quantity === 1 || formLoading === true">-</button>
                            </div>
                            <input type="number" class="form-control col-4 quantity text-center p-0" min= 1  v-model="item.quantity" @change="changeQuantity(item, item.quantity)" >
                            <div class="input-group-append">
                                <button type="button" class="btn" @click="changeQuantity(item, item.quantity + 1)" :disabled="formLoading === true">+</button>
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
  components: {
    Navbar,
    Footer,
    CheckoutNav
  },
  data () {
    return {
      discountPrice: 0,
      coupon: {},
      couponCode: '',
      couponMsg: '',
      step1: true
    }
  },
  methods: {
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
    changeQuantity (item, quantity) {
      this.$store.dispatch('changeQuantity', { item, quantity })
    },
    delItem (id) {
      this.$store.dispatch('delItem', id)
    }
  },
  computed: {
    cart () {
      return this.$store.state.cart
    },
    totalPrice () {
      return this.$store.state.totalPrice
    },
    shippingFee () {
      return this.$store.state.shippingFee
    },
    formLoading () {
      return this.$store.state.formLoading
    }
  },
  created () {
    this.$store.dispatch('updateLoading', true)
    setTimeout(() => {
      this.$store.dispatch('updateLoading', false)
    }, 1000)
  }
}
</script>
