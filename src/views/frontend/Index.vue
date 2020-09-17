<template>
  <div class="Index">
    <Navbar></Navbar>
    <LoadingPage :isLoading="isLoading"></LoadingPage>
    <Gotop></Gotop>
    <div v-if="!isLoading">
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
                    <div class="title h2 mb-5"><span>關於我們</span></div>
                      <p> 在生活步調快速的現代，忙於課業、工作及娛樂上，<br>
                          飲食也是一種健康的代表，許多人經常用速食來解決三餐，忽略了營養均衡的重要。
                      </p>
                      <p> Healthy Diet 屬於輕食文化，<br>
                          採用低鹽低鈉少油，主餐以少量的肉類搭配大量的新鮮<br>
                          蔬果，降低消費者對身體的負擔，注重消費者能夠吃得健康又安心。
                      </p>
                  </div>
                  <router-link to="/about"><button class="btn mt-5">了解更多</button></router-link>
                </div>
              </div>
            </div>
          </div>
      </div>
      <div class="sentence mt-5 mb-4" >
        <div class="section" >
          <div class="first" data-aos="slide-left" data-aos-duration="500">A HealthyDiet a day</div>
          <div class="second" data-aos="slide-right" data-aos-duration="500"> keeps the doctor away</div>
        </div>
      </div>
      <div class="container">
          <div class="row">
            <div class="products w-100">
              <div class="title h2 m-0 my-3"><span>產品分類</span></div>
              <div class="category mb-5 mt-4">
                <div class="cardList lunchbox col-md-4" data-aos="flip-up" data-aos-duration="1000">
                  <span>Bento</span>
                  <div class="bg">
                    <div class="hoverpic"><img src="@/assets/logo.png" alt=""></div>
                    <p class="font-weight-bold">
                      健康餐盒<br>
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
                    <div class="hoverpic"><img src="@/assets/logo.png" alt=""></div>
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
                    <div class="hoverpic"><img src="@/assets/logo.png" alt=""></div>
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
              <button :disabled="errors[0]" type="button" class="btn" style="font-size: 13px;">訂閱</button>
            </div>
            <span class="invalid-feedback">{{ errors[0] }}</span>
          </Validation-Provider>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Gotop from '@/components/frontend/Gotop'
import LoadingPage from '@/components/frontend/LoadingPage'
import Navbar from '@/components/frontend/Navbar'
import Footer from '@/components/frontend/Footer'

export default {
  components: {
    Gotop,
    LoadingPage,
    Navbar,
    Footer
  },
  data () {
    return {
      email: '',
      isLoading: false
    }
  },
  created () {
    this.isLoading = true
    setInterval(() => {
      this.isLoading = false
    }, 1000)
  }
}
</script>

<style lang="scss">
$primary : #264710;
$secondary: #de9e36;
$bgD:#CED4DA;
$bgL:#F7F7F7;

.Index {
  .title{
    color: $primary;
    display: inline-block;
    font-weight: bold;
    padding: 10px;
    span{
      position: relative;
      &::before{
        position: absolute;
        bottom: 0;
        transform: translateX(50%);
        content: "";
        width: 50%;
        height: 2px;
        background: $primary;
        margin-bottom: -10px;
      }
    }
  }
  .banner{
    background: url('https://images.unsplash.com/photo-1543353071-873f17a7a088?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80') no-repeat center center;
  }
  .aboutUs{
    .content{
      display: flex;
      justify-content: space-between;
      text-align: left;
      .btn{
        float: right;
        border: 1px solid $primary;
        background: $primary;
        color: #fff;
        font-weight: bold;
        border-radius: 50px;
        padding: 5px 30px;
        &:hover{
          background: transparent;
          color: $primary;
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
          background: $primary;
        }
        &::after{
          content: "";
          width: 20px;
          height: 70%;
          position: absolute;
          left: 0;
          top: 0;
          background:$primary;
        }
      }
      img{
        padding: 10px;
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
      color: $secondary;
      margin: 0 auto;
      font-size: 80px;
      font-family: Yellowtail;
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
        background: rgba(42,85,41,0.9);
        color: white;
        img{
          width: 60%;
          height: 60%;
          transition: all 0.5s ease-out;
        }
      }
      span{
        display: block;
        color: #fff;
        font-size: 100px;
        font-family: Yellowtail, cursive;
        font-weight: bold;
        letter-spacing: 5px;
        transition: 0.5s ease-out;
        text-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3), 3px 3px rgba(0, 0, 0, 0.3),
        4px 4px rgba(0, 0, 0, 0.3), 5px 5px rgba(0, 0, 0, 0.3), 6px 6px rgba(0, 0, 0, 0.3);

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
        background: url('https://images.unsplash.com/photo-1551248429-40975aa4de74?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1500&q=80') no-repeat
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
      background: rgba(255, 255, 255, 0.8);
      color: $primary;
      padding: 30px;
      font-size: 28px;
      font-weight: bold;
      .btn{
        background: $primary;
        color: #fff;
      }
    }
  }
}
// .Footer{
//   margin-top: 0;
// }
</style>
