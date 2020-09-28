<template>
    <div class="Footer">
      <div class="container">
          <div class="footer_section">
            <span>© 2020 Healthy Diet All Rights Reserved.</span>
          </div>
          <div class="feature">
            <router-link to="/admin/products" class="gobackend">｜後台管理｜</router-link>
            <a  class="fab fa-github " href="https://github.com/physicx594?tab=repositories" target="_blank"></a>
          </div>
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
  background: #F7F7F7;
  .container{
    width: 100%;
    height: 100%;
    max-height: 64px;
    background: #F7F7F7;
    padding: 20px;
    font-size: 16px;
    text-align: left;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .footer_section {
      & span{
        font-weight: bold;
        color: $primary;
      }
    }
    .feature{
      display: flex;
      justify-content: center;
      align-items: center;
      a{
        color: $primary;
      }
    }
    @media screen and (max-width: 992px) {
      justify-content: center;
      max-height: 80px;
      font-size: 13px;
      span span{
        display: block;
      }
      a{
        display: none;
      }
    }
  }
}
</style>
