<template>
    <div class="adminOrders">
    <Loading :active.sync="isLoading"></Loading>
    <div class="container">
      <table class="table mt-3">
        <thead class="table">
          <tr scope="row ">
            <th width="6%" class="text-center">編號</th>
            <th>下單時間</th>
            <th>購買款項</th>
            <th>付款方式</th>
            <th>應付金額</th>
            <th width="12%">是否付款</th>
          </tr>
        </thead>
        <tbody>
          <tr scope="row" v-for="(item, index) in orders" :key="index">
            <th class="text-center">{{ index + 1 }}</th>
            <td>{{ new Date(item.create_at * 1000).toLocaleString() }}</td>
            <td>
              <ul class="list-unstyled">
                <li
                  v-for="(product, i) in item.products"
                  :key="i"
                >
                  {{ product.product.title }} 數量：{{ product.qty }}
                  {{ product.product.unit }}
                </li>
              </ul>
            </td>
            <td>{{ item.payment }}</td>
            <td>${{ item.total }}</td>
            <td>
              <div class="custom-control custom-switch">
                <input
                  :id="item.id"
                  v-model="item.is_paid"
                  type="checkbox"
                  class="custom-control-input"
                  @click="orderPaid(item)"
                >
                <label
                  class="custom-control-label"
                  :for="item.id"
                >
                  <strong
                    v-if="item.is_paid"
                    class="text-success"
                  >已付款</strong>
                  <span
                    v-else
                    class="text-muted"
                  >尚未付款</span>
                </label>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Orders',
  data () {
    return {
      isLoading: false,
      orders: []
    }
  },
  methods: {
    getOrders () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_UUID}/admin/orders`
      this.axios
        .get(api)
        .then((res) => {
          this.orders = res.data.orders
          this.isLoading = false
        })
        .catch((res) => {
          this.isLoading = false
          this.$bus.$emit('message', { fail: '操作失敗,請檢查' })
        })
    },
    orderPaid (item) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_UUID}/admin/order/${item.id}`
      this.axios.put(api, { data: { is_paid: !item.is_paid } })
        .then((res) => {
          this.getOrders()
          this.$bus.$emit('message', '修改成功')
        })
        .catch((res) => {
          this.isLoading = false
          console.log(res, '執行失敗')
        })
    }
  },
  created () {
    this.getOrders()
  }
}
</script>

<style lang="scss">
.adminOrders{
  margin-top: 70px;
}
</style>
