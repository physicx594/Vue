<template>
  <div class="adminCoupons">
    <Loading :active.sync="isLoading"></Loading>
    <div class="container">
      <div class="text-right mt-3">
        <button type="button" class="btn btn-outline-dark" @click="openModal('add')">
          建立新優惠券
        </button>
      </div>
      <table class="table mt-3">
        <thead class="table">
          <tr scope="row ">
            <th width="6%" class="text-center">編號</th>
            <th>名稱</th>
            <th>折扣百分比</th>
            <th>到期日</th>
            <th>倒數</th>
            <th>上架</th>
            <th width="15%">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr scope="row" v-for="(item, index) in coupons" :key="index">
            <th class="text-center">{{ index + 1 }}</th>
            <td>{{ item.title }}</td>
            <td>{{ item.percent }}</td>
            <td>{{ new Date(item.due_date * 1000).toLocaleString() }}</td>
            <td class="countdown text-danger" v-if="item.countdownStatus === '過期囉'">{{ countdown(item) }}</td>
            <td class="countdown" v-else>{{ countdown(item) }}</td>

            <td v-if="item.countdownStatus === '過期囉'">
              <div class="box deadline" >
                <div class="circle"></div>
              </div>
            </td>
            <td v-else>
              <div class="box" :class="{ open: item.is_enabled }" @click="state('enabled', item)">
                <div class="circle" :class="{ open: item.is_enabled }"></div>
              </div>
            </td>
            <td>
              <button
                type="button"
                class="btn btn-outline-primary mr-1"
                @click="openModal('edit', item)"
              >
                編輯
              </button>
              <button
                type="button"
                class="btn btn-danger"
                @click="openModal('delete', item)"
              >
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- add、edit modal -->
      <div id="couponModal" class="modal fade" tabindex="-1" role="dialog" ria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document" >
          <div class="modal-content">
            <div class="modal-header">
              <h5 id="exampleModalLabel" class="modal-title" >
                {{ status.type === 'add' ? '新增優惠券' : '編輯優惠券'}}
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close" >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="form-group">
                <label for="title">標題</label>
                <input id="title" v-model="tempCoupon.title" type="text" class="form-control" placeholder="請輸入標題" >
              </div>
              <div class="form-group">
                <label for="coupon_code">優惠碼</label>
                <input
                  id="coupon_code" v-model="tempCoupon.code" type="text" class="form-control" placeholder="請輸入優惠碼">
              </div>
              <div class="form-group">
                <label for="due_date">到期日</label>
                <input id="due_date" type="date" v-model="due_date" class="form-control">
              </div>
              <div class="form-group">
                <label for="due_time">到期時間</label>
                <input id="due_time" type="time" v-model="due_time" step="1" class="form-control">
              </div>
              <div class="form-group">
                <label for="price">折扣百分比</label>
                <input id="price" v-model.number="tempCoupon.percent" type="number" class="form-control" placeholder="請輸入折扣數量">
              </div>
              <div class="form-group">
                <div class="form-check">
                  <input id="is_enabled" v-model="tempCoupon.is_enabled"
                    class="form-check-input" type="checkbox"
                    :true-value="1" :false-value="0"
                    :disabled="tempCoupon.countdownStatus === '過期囉'">
                  <label class="form-check-label" for="is_enabled">
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal">
                關閉
              </button>
              <button type="button" class="btn btn-primary" @click="updateCoupons">
                {{ status.type === 'add' ? '新增' : '更新' }}
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- delete modal -->
      <div id="deleteModal" class="modal fade" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document" >
          <div class="modal-content border-0">
            <div class="modal-header bg-danger text-white">
              <h5 id="exampleModalLabel" class="modal-title" >
                <span>刪除優惠卷</span>
              </h5>
              <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              是否刪除
              <strong class="text-danger">{{ tempCoupon.title }}</strong> 優惠券(刪除後將無法恢復)。
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-secondary" data-dismiss="modal" >
                取消
              </button>
              <button type="button" class="btn btn-danger" @click="deleteCoupon">
                確認刪除
              </button>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
export default {
  /* global $ */
  name: 'Coupons',
  data () {
    return {
      isLoading: false,
      coupons: [],
      status: {
        type: '',
        message: ''
      },
      tempCoupon: {
        title: '',
        is_enabled: 0,
        percent: 100,
        due_date: 0,
        code: ''
      },
      due_date: '',
      due_time: ''
    }
  },
  methods: {
    getCoupons () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_UUID}/admin/coupons`
      this.axios.get(api)
        .then((res) => {
          this.coupons = res.data.coupons
          this.coupons.forEach((item) => {
            this.$set(item, 'countdownStatus', '')
          })
          this.isLoading = false
          if (this.status.message) {
            this.$bus.$emit('message', this.status.message)
          }
          this.status = {}
        })
        .catch((res) => {
          console.log(res, '執行失敗')
        })
    },
    updateCoupons () {
      this.tempCoupon.due_date = Math.floor(new Date(`${this.due_date} ${this.due_time}`).getTime() / 1000)
      let api = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_UUID}/admin/coupon`
      let http = 'post'
      this.status.message = '新增成功'
      if (this.tempCoupon.id) {
        this.status.message = '編輯成功'
        api = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_UUID}/admin/coupon/${this.tempCoupon.id}`
        http = 'put'
      }
      this.axios[http](api, { data: this.tempCoupon })
        .then((res) => {
          $('#couponModal').modal('hide')
          this.getCoupons()
        })
        .catch((res) => {
          console.log(res, '執行失敗')
        })
    },
    deleteCoupon () {
      const api = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_UUID}/admin/coupon/${this.tempCoupon.id}`
      this.axios.delete(api)
        .then((res) => {
          this.status.message = '刪除成功'
          this.getCoupons()
        })
        .catch((res) => {
          console.log(res, '執行失敗')
        })
    },
    openModal (type, item) {
      this.status.type = type
      switch (type) {
        case 'add':
          this.tempCoupon = {}
          $('#couponModal').modal('show')
          break
        case 'edit': {
          this.tempCoupon = { ...item }
          const deadlineDate = new Date(this.tempCoupon.due_date * 1000)
          this.due_date = deadlineDate.toISOString().split('T')[0]
          this.due_time = deadlineDate.toTimeString().split(' ')[0]
          $('#couponModal').modal('show')
          break
        }
        case 'delete':
          this.tempCoupon = { ...item }
          $('#deleteModal').modal('show')
          break
      }
    },
    state (type, stateItem) {
      switch (type) {
        case 'enabled':
          this.coupons.forEach((item) => {
            if (item.id === stateItem.id) {
              this.tempCoupon = stateItem
              this.tempCoupon.is_enabled = this.tempCoupon.is_enabled ? 0 : 1
            }
          })
          break
      }
      const api = `${process.env.VUE_APP_API_URL}/api/${process.env.VUE_APP_UUID}/admin/coupon/${this.tempCoupon.id}`
      this.axios.put(api, { data: this.tempCoupon })
        .then(() => {
          this.getCoupons()
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  created () {
    this.getCoupons()
  },
  computed: {
    countdown () {
      return function (v) {
        console.log(v)
        const deadline = v.due_date * 1000
        const now = new Date().getTime()
        const days = Math.floor(((deadline - now) / 1000 / 60 / 60) / 24)
        const hours = Math.floor(((deadline - now) / 1000 / 60 / 60) % 24)
        const minutes = Math.floor(((deadline - now) / 1000 / 60) % 60)

        if (minutes < 0) {
          v.countdownStatus = '過期囉'
          v.is_enabled = 0
          return v.countdownStatus
        } else if (days <= 0 && hours <= 0) {
          return minutes + '分鐘'
        } else if (days <= 0) {
          return hours + '小時'
        } else {
          return days + '天'
        }
      }
    }
  }
}
</script>

<style lang="scss">
.adminCoupons{
  .countdown{
    color: green;
  }
  .deadline{
    color: red;
  }
  .box {
    cursor: pointer;
    box-sizing: border-box;
    width: 60px;
    height: 30px;
    background-color: #ebaca3;
    border-radius: 35px;
    transition: 0.3s;
    &.open {
      background-color: #afddae;
    }
    &.deadline{
      cursor: not-allowed;
    }
  }
  .circle {
    box-sizing: border-box;
    width: 30px;
    height: 30px;
    background-color: #dc3545;
    border-radius: 50%;
    transition: 0.3s;
    &.open {
      background-color: #28a745;
      margin-left: 30px;
    }
  }

}

</style>
