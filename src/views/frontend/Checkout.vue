<template>
    <div class="Checkout">
      <div class="container">
        <div class="row">
          <div class="checkoutNav">
            <div class="step active"><div>購物車</div></div>
            <div class="step active"><div>填寫資料</div></div>
            <div class="step"><div>訂單確認</div></div>
          </div>
          <div class="checkContent">
            <div class="customerForm mb-5">
              <div class="header ">顧客資料</div>
                <Validation-Observer  v-slot="{ invalid }">
                  <form>
                    <div class="form-row">
                      <div class="form-group col">
                        <Validation-Provider rules="required|min:3" v-slot="{ errors, classes }">
                          <label for="name">姓名</label>
                          <input type="text" class="form-control" id="name" name="姓名" placeholder="請輸入姓名" v-model="form.name" :class="classes">
                          <span class="invalid-feedback text-left" >{{ errors[0] }}</span>
                        </Validation-Provider>
                      </div>
                      <div class="form-group col">
                        <Validation-provider rules="required|min:10" v-slot="{ errors, classes }">
                          <label for="tel">電話</label>
                          <input type="tel" class="form-control" id="tel" name="電話" placeholder="請輸入電話" v-model="form.tel" :class="classes">
                          <span class="invalid-feedback">{{ errors[0] }}</span>
                        </Validation-provider>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col">
                        <Validation-Provider rules="required|email" v-slot="{ errors, classes }">
                          <label for="email">電子信箱</label>
                          <input type="email" class="form-control" id="email" name='電子信箱' placeholder="請輸入信箱" v-model="form.email" :class="classes">
                          <span class="invalid-feedback">{{ errors[0] }}</span>
                        </Validation-Provider>
                      </div>
                      <div class="form-group col">
                        <Validation-Provider rules="required" v-slot="{ errors, classes }">
                          <label for="address">地址</label>
                          <input type="text" class="form-control" id="address" name="地址" placeholder="請輸入地址" v-model="form.address" :class="classes">
                          <span class="invalid-feedback">{{ errors[0] }}</span>
                        </Validation-Provider>
                      </div>
                    </div>
                    <div class="form-row">
                      <div class="form-group col mb-0">
                        <label for="message">備註</label>
                        <textarea style="height: 120px"  class="form-control" id="message" v-model="form.message"></textarea>
                      </div>
                      <div class="form-group col footer mb-0">
                        <label for="payment">付款方式</label>
                        <select  v-model="form.payment" id="payment" class="form-control" required style="font-size:13px;">
                          <option value="" disabled selected >
                            請選擇付款方式
                          </option>
                          <option value="WebATM">
                            WebATM
                          </option>
                          <option value="ATM">
                            ATM
                          </option>
                          <option value="CVS">
                            CVS
                          </option>
                          <option value="Barcode">
                            Barcode
                          </option>
                          <option value="Credit">
                            Credit
                          </option>
                          <option value="ApplePay">
                            ApplePay
                          </option>
                          <option value="GooglePay">
                            GooglePay
                          </option>
                        </select>
                        <div class="footBtn">
                          <router-link to="/cart">←回購物車</router-link>
                          <router-link to="/CheckoutPay" ><button :disabled="invalid" type="button" class="btn btn-success d-block w-100" style="font-size: 13px;" @click="createOrder">提交訂單</button></router-link>
                        </div>
                      </div>
                    </div>
                  </form>
                </Validation-Observer>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>

export default {
  name: 'Checkout',

  data () {
    return {
      cart: [],
      totalPrice: 0,
      shippingFee: 200,
      form: {
        name: '',
        email: '',
        tel: '',
        address: '',
        message: '',
        payment: ''
      }
    }
  },
  methods: {
    getCart () {
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`
      this.axios.get(api)
        .then((res) => {
          this.cart = res.data.data
          this.totalPrice = 0
          this.cart.forEach((item) => {
            this.totalPrice += Number(
              item.product.price * item.quantity || item.product.origin_price * item.quantity
            )
          })
          this.totalPrice > 3000 ? this.shippingFee = 0 : this.shippingFee = 200
          this.isLoading = false
        })
    },
    createOrder () {
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/orders`
      const order = { ...this.form }
      this.axios.post(api, order)
        .then(res => {
          this.getCart()
          this.$bus.$emit('orderId', res.data.data.id)
        })
    }
  },
  created () {
    this.getCart()
  }
}
</script>

<style lang="scss">
.Checkout{
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
    .checkContent{
      width: 100%;
      display: flex;
      justify-content: space-between;
      font-size: 13px;
      .customerForm{
        width: 100%;
        margin: 0 auto;
        border: 1px solid #EDEDED;
        input::placeholder{
          font-size: 13px;
        }
        .form-control:focus, .btn:focus{
          border: 1px solid #ced4da;
          box-shadow: none;
        }
        form{
          padding: 24px;
          text-align: left;
          .footer{
            position: relative;
            .footBtn{
              position: absolute;
              width: 100%;
              display: flex;
              justify-content: space-between;
              align-items: center;
              bottom: 0;
              right: 0;
              padding: 0 5px;
            }
          }
        }
      }
    }
}

</style>
