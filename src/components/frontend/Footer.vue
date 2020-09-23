<template>
    <div class="Footer">
      <div class="Footer_section">
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
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 13px;
  &_section{
    height: 64px;
    line-height: 64px;
    font-weight: bold;
    color: $primary;
  }
  .btn{
    color: $primary;
    border: 1px solid $primary;
    padding: 5px 15px;
  }
  @media screen and (max-width: 767px) {
    justify-content: center;
    .btn{
      display: none;
    }
  }
}

</style>
