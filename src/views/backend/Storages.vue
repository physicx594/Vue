<template>
  <div class="adminStorages">
    <Loading :active.sync="isLoading"></Loading>
    <div class="container">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">圖片→</th>
          </tr>
        </thead>
        <tbody>
          <tr></tr>
          <tr>
              <th class="border-0 images"  v-for="(item) in storages" :key="item.id">
                <viewer :options="options">
                  <figure>
                <img :src="item.path" class="img-fluid">
                </figure>
                </viewer>
                <div class="imgHover" >
                  <span @click="openModal(item)">
                    <i class="far fa-trash-alt fa-3x" />
                  </span>
                </div>
              </th>
          </tr>
        </tbody>
      </table>
    </div>
        <!-- delete Modal -->
    <div class="modal fade" tabindex="-1" role="dialog" id="deleteModal">
      <div class="modal-dialog" role="document">
          <div class="modal-content">
              <div class="modal-header bg-danger text-white">
                  <h5 class="modal-title">刪除圖片</h5>
                      <button type="button" class="close text-white" data-dismiss="modal" aria-label="Close">
                          <span aria-hidden="true">&times;</span>
                      </button>
              </div>
              <div class="modal-body">
                <img :src="tempImg.path" class="img-fluid" width="200">
              </div>
              <div class="modal-footer justify-content-between" >
                <p>是否 <span class="text-danger font-weight-bold">刪除</span> 這張圖片</p>
                  <div>
                    <button type="button" class="btn btn-danger mr-1" @click="deleteImg(tempImg)">確認</button>
                    <button type="button" class="btn btn-outline-dark" data-dismiss="modal">取消</button>
                  </div>
              </div>
          </div>
      </div>
    </div>
  </div>
</template>

<script>
/* global $ */

export default {
  name: 'Storages',
  data () {
    return {
      options: {
        navbar: false,
        title: false
      },
      isLoading: false,
      storages: [],
      tempImg: {}
    }
  },
  methods: {
    getStorages () {
      this.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/storage`
      this.axios.get(api)
        .then((res) => {
          this.storages = res.data.data
          this.isLoading = false
          $('#deleteModal').modal('hide')
        })
        .catch((res) => {
          console.log(res, '執行失敗')
        })
    },
    deleteImg (item) {
      this.isLoading = true
      const api = `${process.env.VUE_APP_APIPATH}/${process.env.VUE_APP_UUID}/admin/storage/${item.id}`
      this.axios.delete(api)
        .then((res) => {
          this.getStorages()
        })
        .catch((res) => {
          console.log(res, '執行失敗')
        })
    },
    openModal (item) {
      $('#deleteModal').modal('show')
      this.tempImg = item
    }
  },
  created () {
    this.getStorages()
  }
}
</script>

<style lang="scss">
.adminStorages {
  .modal-body{
    width: 1580;
    margin:  auto;
  }
  margin-top: 70px;
  tbody tr{
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: flex-start;
    th{
      position: relative;
      width: 25%;
      &:hover{
        cursor: zoom-in;
      }
      &:hover img{
        filter:brightness(20%);
      }
      &:hover .imgHover{
        color: white;
        opacity: 1;
      }
      figure{
      height: 150px;
      overflow: hidden;
        img{
          width: 100%;
          height: 100%;
          border-radius: 6px;
          object-fit: cover;
          object-position: center center;
        }
      }
      .imgHover{
        // width: 100%;
        position: absolute;
        left: 50%;
        top:50%;
        transform: translate(-50%, -50%);
        opacity: 0;
        &:hover{
          cursor: pointer;
          color: red;
        }
      }
    }
  }
}
</style>
