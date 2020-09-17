<template>
  <div class="CheckoutSuccess">
      <!-- <div class="picL"></div> -->
      <div class="picR"></div>
        <!-- <div class="card">
            <div class="content">
              <div class="float-left">
                <h1>付款完成</h1>
                <span class="d-block">我們已收到您的訂單，感謝您的支持</span>
              </div>
                <router-link to="/products"><button type="button" class="btn d-block">繼續購物</button></router-link>
            </div>
        </div> -->
  </div>
</template>

<script>

export default {}
</script>

<style lang="scss">
.CheckoutSuccess {
  overflow: hidden;
  margin-bottom: 19px;
  // .picL {
  //   position: absolute;
  //   right: 0;
  //   width: 65%;
  //   height: 100vh;
  //   background: url('https://images.unsplash.com/photo-1555243896-c709bfa0b564?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80') no-repeat center top;
  //   background-size: cover;
  //   transform: scale(-1);
  //   z-index: 1;
  // }
  .picR {
    position: absolute;
    left: 0;
    width: 100%;
    height: 100vh;
    background: url('https://images.unsplash.com/photo-1569420077790-afb136b3bb8c?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=3000&q=80') no-repeat center center;
    background-size: cover;
    // transform: scale(-1);
    z-index: 2000;
  }
  .card {
    // position: absolute;
  //   top: 0;
  //   left: 10;
  //   box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.06);
  //   transform: translateX(50%) translateY(19%) ;
  //   width: 30%;
  //   height: 80%;
  //   background-color: white;
  //   overflow: hidden;
  //   padding: 0 20px;
  //   z-index: 2;
  //   .content{
  //       height: 100%;
  //       transform: translate(0,25%);
  //       h1{
  //         background: linear-gradient(-225deg, #FFE29F 0%, #FFA99F 48%, #FF719A 100%);
  //         background-clip: text;
  //         color: transparent;
  //         font-weight: bolder;
  //       }
  //       .btn{
  //         position: absolute;
  //         right: 0;
  //         bottom: 50%;
  //         width: 50%;
  //         border: none;
  //         border-radius: 50px;
  //         background: linear-gradient(225deg, #FFE29F 0%, #FFA99F 48%, #FF719A 100%);
  //         color: white;
  //       }
  //   }
  }
}
// .Footer{
//   position: relative;
//   background: white;
//   width: 100%;
//   bottom: -10%;
//   z-index: 2;
// }
</style>
