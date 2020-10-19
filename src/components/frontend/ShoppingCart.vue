<template>
    <div class="shoppingCart p-2" :class="{ 'show': openCart }">
      <div  v-if="totalPrice !== 0">
        <table class="table mb-0">
          <thead class="table">
            <tr scope="row" >
              <th class="pic"></th>
              <th class="name">品名</th>
              <th class="price">單價</th>
              <th class="qty">數量</th>
              <th class="del"></th>
              <!-- <th ><button class="btn delete" style="font-size: 13px" @click="delAll">All</button></th> -->
            </tr>
          </thead>
          <tbody>
            <tr scope="row" v-for="(item, index) in cart" :key="index">
              <td><img :src="item.product.imageUrl[0]"></td>
              <td>{{ item.product.title }}</td>
              <td v-if="!item.product.price">{{ item.product.title }}{{ item.product.origin_price | money }}</td>
              <td v-else>{{ item.product.price | money }}</td>
              <td>
                <div class="input-group">
                  <div class="input-group-prepend">
                    <button type="button" class="btn"  @click="changeQuantity(item, item.quantity - 1)"
                    :disabled="item.quantity === 1 || formLoading === true">-</button>
                  </div>
                  <input type="text" class="form-control quantity text-center p-0" min="1"  v-model="item.quantity" @change="changeQuantity(item, item.quantity)" onkeyup="value=value.replace(/^(0+)|[^\d]+/g,'')">
                  <div class="input-group-append">
                    <button type="button" class="btn" @click="changeQuantity(item, item.quantity + 1)" :disabled="formLoading === true">+</button>
                  </div>
                </div>
              </td>
              <td><button type="button" class="btn delete" @click="delItem(item.product.id)" :disabled="formLoading === true"><i class="far fa-trash-alt fa-1x"></i></button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="footer">
          <div  class="totalPrice" v-if="formLoading === false">
            <div class="mr-1">小計:</div>
            <div class=" text-danger font-weight-bolder" v-if="totalPrice">{{ totalPrice | money }}</div>
          </div>
          <div class="load" v-else></div>
          <router-link to="/cart"><button class="btn checkout" v-if="formLoading === false" @click="closeCart">前往購物車</button></router-link>
        </div>
      </div>
      <div class="py-3" v-else>
         <h3 class="empty mb-5">購物車是空的</h3>
        <router-link to="/products"><button class="btn goShopping" @click="closeCart">來去購物</button></router-link>
      </div>
    </div>
</template>

<script>
export default {
  name: 'ShoppingCart',
  props: ['openCart', 'cart', 'totalPrice'],
  data () {
    return {
      isLoading: false
    }
  },
  methods: {
    changeQuantity (item, quantity) {
      this.$store.dispatch('changeQuantity', { item, quantity })
    },
    delItem (id) {
      this.$store.dispatch('delItem', id)
    },
    delAll () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/ec/shopping/all/product`
      this.axios.delete(api)
        .then((res) => {
          this.$emit('update')
          this.isLoading = false
        })
    },
    closeCart () {
      this.$emit('close')
    }
  },
  computed: {
    formLoading () {
      return this.$store.state.formLoading
    }
  }
}
</script>

<style lang="scss">
$primary : #2a5529;
$secondary: #FEC81A;
$contrast: #800000;
$bgD:#CED4DA;
$bgL:#F7F7F7;

.shoppingCart{
  position: fixed;
  right: -500px;
  top: 106px;
  width: 100%;
  max-width: 500px;
  max-height: 480px;
  color: black;
  overflow-x: hidden;
  overflow-y: scroll;
  background-color: rgb(255, 255, 255);
  box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.06);
  transition: all 0.5s ease-out;
  z-index: 2000;
  &.show{
      right: 10px;
  }
  table{
    width: 100%;
    .name, .price, .qty, .total{
      width: 20%;
    }
    .del, .pic{
      width: 10%;
    }
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
    .delete{
      color: $contrast;
      border: 1px solid $contrast;
      &:hover{
        background: $contrast;
        color: #fff;
      }
    }
  }
  .footer{
    .totalPrice{
      width: 100%;
      display: flex;
      justify-content: center;
      background-color: $bgL;
      margin: 16px 0;
    }
    .load{
      width: 100%;
      height: 24px;
      text-align: center;
      letter-spacing: 10px;
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
    .checkout{
      padding: 5px 30px;
      margin: 0 auto;
      background: transparent;
      color: $primary;
      border-radius: 50px;
    }
  }
  .empty{
    color: $primary;
    font-weight: bold;
  }
  .btn{
    border-radius: 50px;
    border: 1px solid $primary;
    color: $primary;
    font-weight: bold;
    &:hover{
      background: $primary;
      color: $secondary;
    }
  }
  .goShopping{
    padding: 5px 30px;
  }
  @media screen and (max-width: 768px) {
    max-width: 300px;
    font-size: 13px;
    table{
      tbody tr td:nth-child(1), thead tr th:nth-child(1){
        display: none;
      }
      td{
        padding: 8px 0px;
        .input-group{
          justify-content: center;
        }
        .input-group-prepend,.input-group-append{
          .btn{
            width: 20px;
            padding: 0px;
          }
        }
      }
    }
  }
}
</style>
