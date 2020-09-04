<template>
    <div class="shoppingCart p-2" :class="{ 'show': openCart }">
      <div  v-if="totalPrice !== 0">
        <table class="table mb-0">
          <thead class="table">
            <tr scope="row" >
              <th width="5%"></th>
              <th width="25%">品名</th>
              <th width="30%">數量</th>
              <th >單價</th>
              <!-- <th width="10%">   <button type="button" class="btn btn-outline-danger float-left" @click="clearCart">清空</button></th> -->
            </tr>
          </thead>
          <tbody>
            <tr scope="row" v-for="(item, index) in cart" :key="index">
              <td><img :src="item.product.imageUrl[0]"></td>
              <td>{{item.product.title}}</td>
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
              <td v-if="!item.product.price">{{item.product.origin_price | filter}}</td>
              <td v-else>{{item.product.price | filter}}</td>
              <td><button type="button" class="btn btn-outline-danger" @click="delItem(item.product.id)" :disabled="isLoading === true"><i class="far fa-trash-alt fa-1x"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
        <div  class="totalPrice" v-if="isLoading === false">
          <div class="mr-1">購物車小計:</div>
          <div class=" text-danger font-weight-bolder" >{{ totalPrice | filter}}</div>
        </div>
        <div class="load" v-else >
          <span class="text-danger font-weight-bold">loading</span>
        </div>
        <router-link to="/cart"><button class="btn btn-brown checkout" v-if="isLoading === false" @click="closeCart">結帳</button></router-link>
      </div>
      <div class="py-3" v-else>
         <h3 class="text-danger font-weight-bold mb-5">購物車是空的</h3>
        <!-- <span class="font-weight-bold load">繼續購物</span> -->
        <router-link to="/products"><button class="btn btn-brown d-block p-0 w-50" style="margin: 0 auto; color:white" @click="closeCart">繼續購物</button></router-link>
      </div>
    </div>
</template>

<script>
export default {
  props: ['openCart', 'cart', 'totalPrice'],
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
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
    },
    clearCart () {
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping/all/product`
      this.axios.delete(api)
        .then((res) => {
          console.log(res)
        })
    },
    closeCart () {
      this.$emit('close')
    }
  }
}
</script>

<style lang="scss">
.shoppingCart{
  position: fixed;
  right: -500px;
  top: 106px;
  width: 500px;
  color: black;
  overflow-x: hidden;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.06);
  transition: all 0.5s ease-out;
  z-index: 2000;
  &.show{
      right: 10px;
  }
  table{
    text-align: left;
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
  .totalPrice{
    width: 100%;
    display: flex;
    justify-content: center;
    background-color: rgba(247, 247, 247, 0.98);
    margin: 8px 0;
    // padding: 16px 16px 8px 0;
    // border-top: 1px solid rgba(0, 0, 0, 0.1);
  }
  .load{
    width: 100%;
    text-align: center;
    letter-spacing: 10px;
    background: linear-gradient(45deg,#fc0 0%,#fc0 20%,#de9e36 20%, #de9e36 45%,#fc0 45%,#fc0 70%,#de9e36 70%, #de9e36 95%,#fc0 95%,#fc0 100%);
    background-size:30px 30px;
    background-position:0 0;
    animation:loading 0.5s infinite linear;
  }
  @keyframes loading{
    0%{
      background-position:0 0;
    }
    100%{
      background-position:30px 0;
    }
  }
  .checkout{
    display: block;
    width: 50%;
    margin: 0 auto;
    padding: 0;
    color: white;
    &:hover{
      background: transparent;
      color: #de9e36;
    }
  }
}
</style>
