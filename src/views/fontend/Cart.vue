<template>
  <div class="Cart">
      <div class="container">
          <div class="row">
            <div class="checkout-nav">
                <div class="step active"><div>購物車</div></div>
                <div class="step"><div>填寫資料</div></div>
                <div class="step"><div>確認訂單</div></div>
            </div>
            <div class="content">
                <div class="header"></div>
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
                        <td>{{item.product.title}}</td>
                        <td v-if="!item.product.price">{{item.product.origin_price | filter}}</td>
                        <td v-else>{{item.product.price | filter}}</td>
                        <td>
                            <div class="input-group">
                            <div class="input-group-prepend">
                                <button type="button" class="btn btn-outline-dark"  @click="item.quantity--;changeQuantity(item)"
                                :disabled="item.quantity === 1 || isLoading === true">-</button>
                            </div>
                            <input type="text" class="form-control col-4 quantity text-center p-0" min="1"  v-model="item.quantity" @change="changeQuantity(item)">
                            <div class="input-group-append">
                                <button type="button" class="btn btn-outline-dark" @click="item.quantity+=1;changeQuantity(item)" :disabled="isLoading === true">+</button>
                            </div>
                            </div>
                        </td>
                        <td>{{ item.product.price * item.quantity | filter }}</td>
                        <td><button type="button" class="btn btn-outline-danger" @click="delItem(item.product.id)" :disabled="isLoading === true"><i class="far fa-trash-alt fa-1x"></i></button>
                        </td>
                        </tr>
                    </tbody>
                </table>
                <!-- <div class="footer"></div> -->
            </div>
          </div>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  data () {
    return {
      cart: [],
      isLoading: false
    }
  },
  methods: {
    getCart () {
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`
      this.axios.get(api)
        .then((res) => {
          this.cart = res.data.data
        })
    },
    changeQuantity (item) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping`
      const cart = {
        product: item.product.id,
        quantity: item.quantity
      }
      this.axios.patch(api, cart)
        .then((res) => {
          this.$emit('update')
          this.isLoading = false
        })
    },
    delItem (id) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping/${id}`
      this.axios.delete(api)
        .then((res) => {
          this.$emit('update')
          this.isLoading = false
        })
    }
  },
  created () {
    this.getCart()
  }

}
</script>

<style lang="scss">
.Cart{
    counter-reset: step;
    .row{
        padding: 0 70px;
        .checkout-nav{
            display: flex;
            margin: 30px auto;
            color: #000000;
            .step{
                position: relative;
                width: 240px;
                height: 70px;
                &::before{
                    content:counter(step);
                    counter-increment: step;
                    display:block;
                    width: 25px;
                    height: 25px;
                    line-height: 25px;
                    margin: 5px auto;
                    border-radius: 50%;
                    border: 1px solid black;
                    background-color: white;
                }
                &::after{
                    content:'';
                    position: absolute;
                    top: 17.5px;
                    left: -50%;
                    width: 100%;
                    height: 1px;
                    background-color: black;
                    z-index: -1;
                }
                &:first-child:after {
                    content:none;
                }
            }
            .step.active{
                color: green;
                font-weight: bold;
                &::before{
                    border: 2px solid green;
                }
                & + .step::after{
                    height: 2px;
                    background-color: green;
                }
            }
        }
        .content{
            width: 100%;
            margin: 0 auto;
            border: 1px solid #EDEDED;
            .header, .footer{
                width: 100%;
                height: 40px;
                background: #F7F7F7;
            }
        }
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
    }
  }

    }
}

</style>
