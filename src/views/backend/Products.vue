<template>
  <div class="adminProducts">

    <Loading :active.sync="isLoading"></Loading>
    <div class="container">
      <div class="text-right mt-3">
        <button
          type="button"
          class="btn btn-outline-dark"
          @click="openModal('add')"
        >建立新產品
        </button>
      </div>
      <table class="table mt-3">
        <thead class="table">
          <tr scope="row ">
            <th width="6%" class="text-center">編號</th>
            <th>分類</th>
            <th width="30%">產品名稱</th>
            <th class="click" @click=" isReverse=!isReverse; sortType = 'origin_price'">
              原價
              <span class="icon isReverse" :class="{inverse: isReverse}"
                  v-if="sortType ==='origin_price'||sortType ==''">
                <i class="fas fa-angle-up text-success"></i>
              </span>
            </th>
            <th class="click" @click="isReverse=!isReverse;sortType='price'">
              售價
              <span class="icon isReverse" :class="{inverse: isReverse}"
                  v-if="sortType ==='price'||sortType ==''">
                <i class="fas fa-angle-up text-success"></i>
              </span>
            </th>
            <th>數量</th>
            <th>優惠卷</th>
            <th>上架</th>
            <th width="15%">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr scope="row" v-for="(item, index) in sortData" :key="index">
            <th class="text-center">{{ index + 1 }}</th>
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td>{{ item.origin_price | filter }}</td>
            <td>{{ item.price | filter }}</td>
            <td v-if="item.options">{{ item.options.quantity }}</td>
            <td v-else></td>
            <td v-if="item.options">
              <div
                class="box"
                :class="{ open: item.options.coupon }"
                @click="state('coupon', item)"
              >
                <div
                  class="circle"
                  :class="{ open: item.options.coupon }"
                ></div>
              </div>
            </td>
            <td v-else></td>
            <td>
              <div
                class="box"
                :class="{ open: item.enabled }"
                @click="state('enabled', item)"
              >
                <div class="circle" :class="{ open: item.enabled }"></div>
              </div>
            </td>
            <td>
              <button type="button" class="btn btn-outline-primary mr-1" @click="openModal('edit', item)">
                編輯
              </button>
              <button type="button" class="btn btn-danger" @click="openModal('delete', item)">
                刪除
              </button>
            </td>
          </tr>
        </tbody>
      </table>
      <Pagination :pages="pagination" @update="getProducts"></Pagination>

      <!-- add、edit modal -->
      <div class="modal fade bd-example-modal-xl" tabindex="-1" role="dialog" aria-labelledby="myHugeModalLabel"
        aria-hidden="true" id="productModal">
        <div class="modal-dialog modal-xl">
          <div class="modal-content">
            <div class="modal-header bg-dark text-white">
              <h5 class="modal-title " id="exampleModalCenteredLabel" v-if="!tempProduct.id">新增產品</h5>
              <h5 class="modal-title " id="exampleModalCenteredLabel" v-else>編輯產品</h5>
              <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="col-4">
                    <div class="form-group mb-0" v-for="(i, index) in 3" :key="index">
                      <label :for="'imageUrl'+[i-1]">圖片網址</label>
                      <input type="text" class="form-control " :id="'imageUrl'+[i-1]" placeholder="請輸入圖片網址" v-model="tempProduct.imageUrl[i-1]">
                    </div>
                    <div class="form-group">
                      <label for="customFile">
                        或 上傳圖片
                      </label>
                      <input id="customFile"  type="file" class="form-control" @change="uploadFile">
                    </div>
                    <img class="img-fluid" :src="tempProduct.imageUrl[0]" hight='100'/>
                </div>
                <div class="col-8">
                    <div class="form-group">
                      <label for="title">標題</label>
                      <input  type="text" class="form-control" id="title" placeholder="請輸入標題" v-model="tempProduct.title">
                    </div>
                  <div class="row">
                    <div class="form-group col">
                      <label for="category">分類</label>
                      <input type="text" id="category" class="form-control"  placeholder="請輸入分類" v-model="tempProduct.category">
                    </div>
                    <div class="form-group col">
                      <label for="unit">單位</label>
                      <input type="text" id="unit" class="form-control"  placeholder="請輸入單位" v-model="tempProduct.unit">
                    </div>
                    <div class="form-group col">
                      <label for="quantity">數量</label>
                      <input type="number" class="form-control" id="quantity" placeholder="請輸入數量" value=0 v-model="tempProduct.options.quantity" v-if="tempProduct.options">
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col-4">
                      <label for="origin_price">原價</label>
                      <input type="number" id="origin_price" class="form-control"  placeholder="請輸入原價" v-model="tempProduct.origin_price">
                    </div>
                    <div class="form-group col">
                      <label for="price">售價</label>
                      <input type="number" id="price" class="form-control"  placeholder="請輸入售價" v-model="tempProduct.price">
                    </div>
                    <div class="form-group col">
                      <label for="coupon" >可用優惠券</label>
                        <select class="custom-select" v-model="tempProduct.options.coupon" v-if="tempProduct.options">
                        <option selected value="請選擇" disabled>請選擇</option>
                        <option  :value= true>Yes</option>
                        <option  :value= false>No</option>
                      </select>
                    </div>
                  </div>
                  <div class="row">
                    <div class="form-group col">
                      <label for="description">產品描述</label>
                      <textarea id="description"  class="form-control" placeholder="請輸入產品描述" v-model="tempProduct.description"  rows="5"></textarea>
                    </div>
                    <div class="form-group col">
                      <label for="content">說明內容</label>
                      <textarea id="content"  type="text" class="form-control"
                        placeholder="請輸入說明內容" v-model="tempProduct.content"  rows="5">
                      </textarea>
                    </div>
                  </div>
                    <div class="form-group">
                      <input type="checkbox" id="enabled" v-model="tempProduct.enabled">
                      <label for="enabled">是否上架
                      </label>
                    </div>
                  </div>
                </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-outline-dark" data-dismiss="modal">取消</button>
              <button type="button" class="btn btn-success" @click="updateProduct">確認</button>
            </div>
          </div>
        </div>
      </div>
      <!-- delete Modal -->
      <div class="modal fade" tabindex="-1" role="dialog" id="deleteModal">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title">刪除產品</h5>
                        <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                </div>
                <div class="modal-body">
                    <p>是否刪除 <span class="font-weight-bold text-danger">{{tempProduct.title}}</span> 這個商品</p>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-dark" data-dismiss="modal">取消</button>
                    <button type="button" class="btn btn-danger" @click="deleteItem">確認</button>
                </div>
            </div>
        </div>
      </div>
      <!-- message Modal -->
      <div class="modal fade bd-example-modal-sm" tabindex="-1" role="dialog"
        aria-labelledby="mySmallModalLabel" aria-hidden="true" id="messageModal">
        <div class="modal-dialog modal-sm ">
          <div class="modal-content p-3 text-center">
            <span v-if="status==='add'" style="lineHeight: 16px">
              <i class="spinner-grow spinner-grow-sm text-success"></i>
              新增成功
            </span>
            <span v-else-if="status==='edit'" style="lineHeight: 16px">
              <i class="spinner-grow spinner-grow-sm text-success"></i>
              編輯成功
            </span>
            <span v-else-if="status==='delete'" style="lineHeight: 16px">
              <i class="spinner-grow spinner-grow-sm text-success"></i>
              刪除成功
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */

export default {
  props: ['token'],
  data () {
    return {
      products: [],
      status: '',
      isReverse: false,
      sortType: '',
      isLoading: false,
      pagination: {},
      tempProduct: {
        enabled: true,
        imageUrl: [],
        options: {}
      }
    }
  },
  methods: {
    getProducts (page = 1) {
      if (this.status === '') this.isLoading = true
      const params = {
        page,
        paged: '15',
        orderBy: 'created_at, updated_at',
        sort: 'asc' // 排序遞增
      }
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/products?page=${params.page}&sort=${params.sort}&paged=${params.paged}`
      this.axios
        .get(api)
        .then(res => {
          this.isLoading = false
          this.products = res.data.data
          this.pagination = res.data.meta.pagination
          $('#productModal').modal('hide')
          $('#messageModal').modal('hide')
          this.status = ''
        })
        .catch(error => {
          console.log(error, '讀取失敗,請重新登入')
        })
    },
    openModal (type, item) {
      switch (type) {
        case 'add':
          this.status = 'add'
          this.tempProduct = {
            enabled: true,
            imageUrl: [],
            options: {
              quantity: 0,
              coupon: false
            }
          }
          $('#productModal').modal('show')
          break
        case 'edit': {
          this.status = 'edit'
          const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/product/${item.id}`
          this.axios.get(api)
            .then(res => {
              this.tempProduct = res.data.data
              $('#productModal').modal('show')
            })
            .catch(error => {
              console.log(error)
            })
        }
          break
        case 'delete':
          $('#deleteModal').modal('show')
          this.status = 'delete'
          this.tempProduct = { ...item }
          break
        default:
          break
      }
    },
    updateProduct () {
      this.isLoading = true
      // 新增
      let api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/product`
      let httpMethod = 'post'
      // 編輯
      if (this.tempProduct.id) {
        api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempProduct.id}`
        httpMethod = 'patch'
      }
      this.axios[httpMethod](api, this.tempProduct)
        .then(() => {
          this.isLoading = false
          $('#productModal').modal('hide')
          $('#messageModal').modal('show')
          this.getProducts()
        })
        .catch((error) => {
          console.log(error)
          this.getProducts()
          this.status = ''
        })
    },
    uploadFile () {
      // 選取 DOM 中的檔案資訊
      const uploadedFile = document.querySelector('#customFile').files[0]
      // 轉成 Form Data
      const formData = new FormData()
      formData.append('file', uploadedFile)

      // 路由、驗證
      const url = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/storage`
      // axios.defaults.headers.common.Authorization = `Bearer ${this.user.token}`

      // 請自行完成 Ajax 範例
      this.axios.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
        .then((res) => {
          console.log(res)
          if (res.status === 200) {
            this.tempProduct.imageUrl.push(res.data.data.path)
          }
        })
        .catch((error) => {
          console.log(error)
          console.log('上傳不可超過 2 MB')
        })
    },
    deleteItem () {
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempProduct.id}`
      this.axios
        .delete(api, this.tempProduct)
        .then((res) => {
          this.getProducts()
          $('#deleteModal').modal('hide')
          $('#messageModal').modal('show')
        })
        .catch((error) => {
          console.log(error)
        })
    },
    state (type, stateItem) {
      switch (type) {
        case 'enabled':
          this.products.forEach((item) => {
            if (item.id === stateItem.id) {
              this.tempProduct = stateItem
              this.tempProduct.enabled = !this.tempProduct.enabled
            }
          })
          break
        case 'coupon':
          this.products.forEach((item) => {
            if (item.id === stateItem.id) {
              this.tempProduct = stateItem
              this.tempProduct.options.coupon = !this.tempProduct.options
                .coupon
            }
          })
          break
      }
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/ec/product/${this.tempProduct.id}`
      this.axios.patch(api, this.tempProduct)
        .then(() => {
          this.getProducts()
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  created () {
    this.getProducts()
  },
  computed: {
    sortData () {
      // eslint-disable-next-line vue/no-side-effects-in-computed-properties
      return this.products.sort((a, b) => {
        a = a[this.sortType]
        b = b[this.sortType]
        if (this.isReverse) {
          return a - b
        } else {
          return b - a
        }
      })
    }
  }
}
</script>

<style lang="scss">
.adminProducts {
  .click{
    &:hover{
      cursor: pointer;
    }
    .icon {
      display: inline-block;
      &.inverse{
        transform: rotate(180deg);
      }
    }
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

  tbody {
    tr:hover {
      background-color: rgba(0, 0, 0, 0.01);
      transform: scale(1.005);
      box-shadow: 0px 0px 20px -5px rgba(0, 0, 0, 0.5);
    }
    tr td,
    th {
      vertical-align: middle;
    }
  }
  .modal{
    text-align: start;
  }
}
</style>
