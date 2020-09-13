<template>
    <div class="Footer">
    <div class="section">
        <span>© 2020 Healthy Diet All Rights Reserved.圖片為練習使用，無商業用途。</span>
        <router-link to="/admin/products" class="float-right"><button type="button" class="btn btn-outline-dark">後台管理</button> </router-link>
    </div>
    <div class="sidebtn">
    </div>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.Footer{
  .section{
    padding: 0 10%;
    height: 64px;
    line-height: 64px;
    color: rgb(28, 91, 103);
    font-weight: bold;
    box-shadow: 0 -1px 10px -1px rgba(0,0,0,.2);
  }
}

</style>
