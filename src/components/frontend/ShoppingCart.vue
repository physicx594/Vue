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
