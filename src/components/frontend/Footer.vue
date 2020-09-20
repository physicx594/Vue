<template>
    <div class="Footer">
      <div class="section">
        <span>© 2020 Healthy Diet All Rights Reserved.  圖片為練習使用，無商業用途。</span>
      </div>
      <router-link to="/admin/products" class="gobackend"><button class="btn">後台管理</button></router-link>
    </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
$primary : #264710;
$secondary: #de9e36;
$bgD:#CED4DA;
$bgL:#F7F7F7;

.Footer{
  width: 100%;
  background: #F7F7F7;
  position: sticky;
  .section{
    padding: 0 10%;
    height: 64px;
      text-align: center;
    line-height: 64px;
    font-weight: bold;
    color: $primary;
  }
  .btn{
    position: absolute;
    top: 14px;
    right: 15%;
    color: $primary;
    border: 1px solid $primary;
    padding: 5px 15px;
  }
}

</style>
