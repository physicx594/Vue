<template>
    <div class="Footer">
      <div class="container">
          <div class="Footer_section">
            <span>© 2020 Healthy Diet All Rights Reserved. <span>圖片為練習使用，無商業用途。</span></span>
          </div>
          <router-link to="/admin/products" class="gobackend">｜後台管理｜</router-link>
      </div>
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
  height: 100%;
  max-height: 64px;
  background: #F7F7F7;
  padding: 20px;
  position: sticky;
  font-size: 16px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  &_section {
    width: 100%;
    & span{
      font-weight: bold;
      color: $primary;
    }
  }
  .container{
    position: relative;
    .gobackend{
      position: absolute;
      right: 0%;
      top: 50%;
      transform: translateY(-50%);
      color: $primary;
      font-weight: bold;
      padding: 5px 15px;
    }
  }
  @media screen and (max-width: 992px) {
    justify-content: center;
    max-height: 80px;
    font-size: 13px;
    span span{
      display: block;
    }
    .gobackend{
      display: none;
    }
  }
}

</style>
