<template>
  <div class="Index">
    <Gotop></Gotop>
    <div class="banner mb-5">
      <div class="Slogan">
        <div class="first">Healthy Diet</div>
        <span class="second">發現蔬食最新鮮純淨的美味</span>
      </div>
    </div>
    <div class="container">
        <div class="row ">
          <div class="aboutUs w-100 my-5">
            <div class="content">
              <figure class="col-md-7 p-0 mb-0" data-aos="fade-right" data-aos-easing="ease-in-out"><img src="https://images.unsplash.com/photo-1595786802424-d6efbc413db5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80" alt=""></figure>
              <div class="col-md-5" data-aos="fade-left" data-aos-easing="ease-in-out" data-aos-delay="250">
                <div class="article font-weight-bold">
                  <h3 class="title mb-5">關於我們</h3>
                  <p> 在生活步調快速的現代，忙於課業、工作及娛樂上<br>
                      飲食也是一種健康的代表，許多人經常用速食來解決三餐，忽略了營養均衡的重要。
                  </p>
                  <p> Healthy Diet 屬於輕食文化，<br>
                      採用低鹽低鈉少油，主餐以少量的肉類搭配大量的新鮮<br>
                      蔬果，降低消費者對身體的負擔，注重消費者能夠吃得健康又安心。
                  </p>
                </div>
                <button class="btn btn-brown  mt-5">了解更多</button>
              </div>
            </div>
          </div>
        </div>
    </div>
    <div class="sentence mt-5 mb-4" >
      <div class="section" >
        <div class="first" data-aos="slide-left" data-aos-duration="500">最單純的食物</div>
        <div class="second" data-aos="slide-right" data-aos-duration="500">最簡單的健康</div>
      </div>
    </div>
    <div class="container">
        <div class="row">
          <div class="products w-100">
            <h3 class="title m-0 my-3">產品分類</h3>
            <div class="category mb-5 mt-4">
              <div class="cardList lunchbox col-md-4" data-aos="flip-up" data-aos-duration="1000">
                <span>Bento</span>
                <div class="bg">
                  <div class="hoverpic"><img src="../../assets/logo.png" alt=""></div>
                  <p class="font-weight-bold">
                    每天都拿不定主意吃什麼嗎？<br>
                    不知道吃的健不健康嗎?<br>
                    這些心聲，我們都聽到了<br>
                    請交給 HEALTHY DIET 幫您備餐
                  </p>
                </div>
              </div>
              <div class="cardList chicken col-md-4" data-aos="flip-up" data-aos-duration="1000" data-aos-delay="150">
                <span class="float-left pl-3">Sous</span><br>
                <span class="float-right pr-3">vide</span>
                <div class="bg">
                  <div class="hoverpic"><img src="../../assets/logo.png" alt=""></div>
                    <p class="font-weight-bold">
                    舒肥雞胸肉<br>
                    多種口味任你挑，滿足挑剔的味蕾<br>
                    輕鬆補足蛋白質，低熱量無負擔<br>
                    多汁不乾柴，顛覆雞胸肉的印象
                  </p>
                </div>
              </div>
              <div class="cardList salad col-md-4" data-aos="flip-up" data-aos-duration="1000" data-aos-delay="300">
                <span >Salad</span>
                <div class="bg">
                  <div class="hoverpic"><img src="../../assets/logo.png" alt=""></div>
                  <p class="font-weight-bold">
                    新鮮沙拉<br>
                    採用豐富的萵苣、蘿蔓、歐式生菜葉與蔬果<br>
                    點綴自製的美味醬料，品嚐生菜的鮮甜爽脆<br>
                    並以最嚴謹的態度為您把關<br>
                    與您一同發掘，蔬食最純淨樸實的美味
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
    </div>
    <div class="subscription mt-5">
      <div class="content" data-aos="zoom-in" data-aos-duration="500">
        <p class="text-left">訂閱我們<br>獲得最新消息及優惠</p>
        <Validation-Provider rules="required|email" v-slot="{ errors, classes }" class="input-group">
          <input type="email" class="form-control" id="email" name='電子信箱' placeholder="請輸入信箱"  :class="classes" v-model="email">
          <div class="input-group-append">
            <button :disabled="errors[0]" type="button" class="btn btn-success" style="font-size: 13px;">訂閱</button>
          </div>
          <span class="invalid-feedback">{{ errors[0] }}</span>
        </Validation-Provider>
      </div>
    </div>
    <div class="footer">© 2020 Healthy Diet All Rights Reserved.圖片為練習使用，無商業用途。</div>
  </div>
</template>

<script>
import Gotop from '../../components/frontend/Gotop'
export default {
  components: {
    Gotop
  },
  data () {
    return {
      email: ''
    }
  }
}
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Mrs+Sheppards&family=Yellowtail&display=swap');
@font-face {
  font-family: hanyi;
  src: url(../../assets/font/hanyi.ttf);
}

.Index {

  .title{
    border-top: 2px solid rgb(28, 91, 103) ;
    border-bottom: 2px solid rgb(28, 91, 103) ;
    color: #1C5B67;
    display: inline-block;
    font-weight: bold;
    padding: 10px;
  }
  .banner {
    width: 100%;
    height: 100vh;
    background: url('https://images.unsplash.com/photo-1543353071-873f17a7a088?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80') no-repeat center
      center;
    background-attachment: fixed;
    background-size: cover;
    .Slogan {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: linear-gradient(
        225deg,
        #ffe29f 0%,
        #ffa99f 48%,
        #ff719a 100%
      );
      background-clip: text;
      color: transparent;
      animation: title 1.5s 1 ease-out forwards;
      & .first{
        font-family: 'Yellowtail', cursive;
        font-size: 80px;
        font-weight: bold;
        color: #de9e36;
        padding-right: 20px;
      }
      & .second{
        padding: 0px 20px;
        border: 1px solid white;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.06);
        font-size: 24px;
        font-weight: bold;
        color: rgb(255, 255, 255);
      }
    }

    @keyframes title {
      0% {
        opacity: 0;
        transform: translate(-50%, -80%);
      }
      100% {
        opacity: 1;
        transform: translate(-50%, 0%);
      }
    }
  }
  .aboutUs{
    .content{
      display: flex;
      justify-content: space-between;
      .btn{
        color: white;
        &:hover{
          background: transparent;
          color: #de9e36;
        }
      }

      figure{
        height: 390px;
        overflow: hidden;
        &::before{
          content: "";
          width: 30%;
          height: 20px;
          position: absolute;
          background: #de9e36;
        }
        &::after{
          content: "";
          width: 20px;
          height: 75%;
          position: absolute;
          left: 0;
          top: 0;
          background: #de9e36;
        }
      }
      img{
        width: 100%;
        height: 100%;
        margin: 20px;
        object-fit: cover;
      }
    }
  }
  .sentence{
    background: url("https://images.unsplash.com/photo-1543352634-a1c51d9f1fa7?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80") center center no-repeat;
    width: 100%;
    min-height: 300px;
    background-attachment: fixed;
    background-size: cover;
    .section{
      background: rgba(0, 0, 0, 0.05);
      color: white;
      margin: 0 auto;
      font-size: 80px;
      font-family: hanyi;
      text-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3), 3px 3px rgba(0, 0, 0, 0.3),
      4px 4px rgba(0, 0, 0, 0.3), 5px 5px rgba(0, 0, 0, 0.3), 6px 6px rgba(0, 0, 0, 0.3);
      width: 100%;
      height: 300px;
      padding: 20px;
      overflow: hidden;
      .first{
        padding-right: 20%;
      }
      .second{
        padding-left: 20%;
      }
    }
  }
  .category {
    display: flex;
    justify-content: center;;
    .cardList {
      position: relative;
      height: 300px;
      padding: 60px 0;
      border: none;
      cursor: pointer;
      &:hover span{
        opacity: 0;
      }
      &:hover .bg{
        opacity: 1;
        & img{
            transform: scale(0.6);
        }
      }
      .bg{
        width: 100%;
        height: 100%;
        position: absolute;
        top: 0;
        opacity: 0;
        transition: all 0.5s ease-out;
        background:rgba(28, 91, 103, 0.9);
        color: white;
        img{
          width: 60%;
          height: 60%;
          transition: all 0.5s ease-out;
        }
      }
      span{
        display: block;
        color: white;
        font-size: 100px;
        font-family: Yellowtail, cursive;
        font-weight: bold;
        letter-spacing: 5px;
        transition: 0.5s ease-out;
        // background-image: linear-gradient(to right, #00dbde 0%, #fc00ff 100%);
        // background-clip: text;
        // color: transparent;
      }
      &.lunchbox {
        background: url('../../assets/Images/product/lunchbox.jpg') no-repeat
          center center;
        background-size: cover;
      }
      &.chicken {
        background: url('../../assets/Images/product/chicken.jpg') no-repeat
          center center;
        background-size: cover;
        span{
          line-height: 80px;
        }
      }
      &.salad {
        background: url('https://images.unsplash.com/photo-1551248429-40975aa4de74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=595&q=80') no-repeat
          center center;
        background-size: cover;
      }
    }
  }
  .subscription{
    background: url("https://images.unsplash.com/photo-1519897831810-a9a01aceccd1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80") center center no-repeat;
    width: 100%;
    min-height: 300px;
    background-attachment: fixed;
    background-size: cover;
    padding-top: 50px;
    filter: saturate(80%);
    .content{
      width: 500px;
      margin: 0 auto;
      background: rgba(255, 255, 255, 0.4);
      color: rgb(28, 91, 103);
      padding: 30px;
      font-size: 28px;
      font-weight: bold;
    }
  }
  .footer{
    height: 64px;
    line-height: 76px;
    color: rgb(28, 91, 103);
    font-weight: bold;
  }
}
</style>
