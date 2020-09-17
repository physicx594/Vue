<template>
    <div class="Footer">
      <div class="section">
        <span>© 2020 Healthy Diet All Rights Reserved.  圖片為練習使用，無商業用途。</span>
      </div>
      <router-link to="/admin/products" class="gobackend">後台管理</router-link>
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
  background: #F7F7F7;
  position: relative;
  .section{
    padding: 0 10%;
    height: 64px;
      text-align: center;
    line-height: 64px;
    font-weight: bold;
    color: $primary;
  }
  .gobackend{
    position: absolute;
    top: 20px;
    right: 15%;
  }
}

</style>
