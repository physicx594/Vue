<template>
  <div class="CheckoutSuccess">
    <div class="container h-100">
      <div class="picR"></div>
        <div class="card">
            <div class="content">
              <div class="float-left">
                <h1>付款完成</h1>
                <span class="d-block">我們已收到您的訂單，感謝您的支持</span>
              </div>
                <router-link to="/products"><button type="button" class="btn d-block">繼續購物</button></router-link>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style lang="scss">

.CheckoutSuccess {
    position:relative;
    overflow: hidden;
  height: 100%;
  width: 100%;
  background: url('../../assets/Images/product/checkoutSuccess.jpg') no-repeat center center;
  background-size: cover;
  .picR {
    width: 100%;
    height: 100%;
    background: url('../../assets/Images/product/checkoutSuccess.jpg') no-repeat center center;
    background-size: cover;
    transform: translateX(30%);
  }
  .card {
    position: absolute;
    top: 0;
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.06);
    transform: translateX(30%) translateY(10%) ;
    width: 30%;
    height: 80%;
    background-color: white;
    overflow: hidden;
    padding: 0 20px;
    .content{
        height: 100%;
        transform: translate(0,25%);
        h1{
          background: linear-gradient(-225deg, #FFE29F 0%, #FFA99F 48%, #FF719A 100%);
          background-clip: text;
          color: transparent;
          font-weight: bolder;
        }
        .btn{
          position: absolute;
          right: 0;
          bottom: 50%;
          width: 50%;
          border: none;
          border-radius: 50px;
          background: linear-gradient(225deg, #FFE29F 0%, #FFA99F 48%, #FF719A 100%);
          color: white;
        }
    }
  }
}
</style>
