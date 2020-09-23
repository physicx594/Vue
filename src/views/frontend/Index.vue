<template>
  <div class="Index">
    <Navbar></Navbar>
    <LoadingPage :isLoading="isLoading"></LoadingPage>
    <Gotop></Gotop>
      <div v-if="!isLoading">
        <Banner :pageName="'Healthy Diet'" :content="'發現蔬食最新鮮純淨的美味'"></Banner>
        <div class="container">
            <div class="row ">
              <div class="aboutUs" id="abs">
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
                    <router-link to="/about"><button class="btn mt-5">更多...</button></router-link>
                  </div>
                </div>
              </div>
            </div>
        </div>
        <div class="selected" >
          <div class="section" >
            <div>嚴選</div>
            <router-link to="/products"><p>用心對待每份產品</p></router-link>
          </div>
          <div class="content">
            <div class="contentSction vegetables">
              <figure>
                <img src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/9B85DD8HXDV6UAPLC0VUg3abgxHc98RZsdnmQemeDzsRzlToIoY2LRjN0ff6uR9M6Zw0sbIuPb0bQY2cLAWXzaKAJF4RsO0Pg9ChafZqIWxR8zSfMaNb6RgjSNjOUMGu.svg" width="75">
              </figure>
              <div class="font-weight-bold h4 text-success mt-2">在地食材</div>
              <p class="font-weight-bold">和小農們合作，使用當地、當季的蔬菜、讓消費者吃進肚的，更加天然、健康、有機，<br>實踐「吃當季、買在地」</p>
            </div>
            <div class="contentSction seasoning">
              <figure>
                <img src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/vxHS0YRn67GsjSNqYvuRxGVZp9xmYfslZ0QqLkdfRA4sZxar8gX0ffwLlTziIPtoIxncfd3JtdreStGt9yIasWXP5obIDmF80tLoeYW2ZqblYfFUbsdPbD8g01exj9C5.svg" width="75">
              </figure>
              <div class="font-weight-bold h4 text-success mt-2">沒有食物添加劑</div>
              <p class="font-weight-bold">希望消費者吃得健康、吃得安心，我們對食材不做多餘的調味，保留食材本身的鮮與甜，<br>讓您一口就能吃出食物的「美」</p>
            </div>
            <div class="contentSction shipping">
              <figure class="pl-2">
                <img src="https://hexschool-api.s3.us-west-2.amazonaws.com/custom/NwYRD1IFuKVZPMLmExI0Kg0qeo8GIkpftkjeGICbfeN60gdqsya1GCxHh9Bnm3F48rJwYHH1Ya052qalxKQCmv6eGI7JUqV1yWfUCxYHPAauA8NgxyAR4Y2vGoiwqsIQ.svg" width="75">
              </figure>
              <div class="font-weight-bold h4 text-success mt-2">接單製作、新鮮運送</div>
              <p class="font-weight-bold">每份餐點都是當日限量，配上專業的冷凍物流，讓您吃到當日最新鮮的食物，消費者吃得安心是對我們最大的鼓勵</p>
            </div>
          </div>
        </div>
        <div class="container">
            <div class="row">
              <div class="products w-100 mt-5">
                <div class="title h2 m-0 my-3 text-left" style="width:100%"><span>產品分類</span></div>
                <div class="category mb-5 mt-4">
                  <div class="cardList lunchbox" data-aos="flip-up" data-aos-duration="1000" @click="toCategory('健康餐盒')">
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
                  <div class="cardList sousvide" data-aos="flip-up" data-aos-duration="1000" data-aos-delay="150" @click="toCategory('舒肥系列')">
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
                  <div class="cardList salad" data-aos="flip-up" data-aos-duration="1000" data-aos-delay="300" @click="toCategory('新鮮沙拉')">
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
import Banner from '@/components/frontend/Banner'
import Footer from '@/components/frontend/Footer'

export default {
  components: {
    Gotop,
    LoadingPage,
    Navbar,
    Banner,
    Footer
  },
  data () {
    return {
      email: '',
      isLoading: false
    }
  },
  methods: {
    toCategory (item) {
      this.$router.push({
        name: 'products',
        params: { category: item }
      })
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
$secondary: #FEC81A;
$contrast: #800000;
$bgD:#CED4DA;
$bgL:#F7F7F7;
$dark: #474747;

.Index {
  font-family: Arial;
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
    width: 100%;
    margin: 60px 0;
    .content{
      display: flex;
      justify-content: space-between;
      text-align: left;
      .btn{
        float: right;
        border: 1px solid $contrast;
        color: #fff;
        color: $contrast;
        font-weight: bold;
        border-radius: 50px;
        padding: 5px 30px;
        &:hover{
          background: $contrast;
          color: #fff;
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

  .selected{
    background: url(https://images.unsplash.com/photo-1516594798947-e65505dbb29d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=750&q=80) center center no-repeat;
    width: 100%;
    background-attachment: fixed;
    background-size: cover;
    margin-top: 48px;
    .section{
      background: #2647105a;
      margin: 0 auto;
      font-family: Arial;
      font-weight: bold;
      width: 100%;
      height: 190px;
      padding: 40px 0;
      overflow: hidden;
      div{
        color: #fff;
        font-size: 40px;
        text-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3), 3px 3px rgba(0, 0, 0, 0.3),
        4px 4px rgba(0, 0, 0, 0.3), 5px 5px rgba(0, 0, 0, 0.3), 6px 6px rgba(0, 0, 0, 0.3);
        margin-bottom: 8px;
      }
       p{
        margin: 0 auto;
        width: 15%;
        padding: 5px 30px;
        color: #fff;
        background: #800000d0;
        border-radius: 50px;
      }
    }
    .content{
      width: 100%;
      height: 350px;
      background: rgba(255, 255, 255, 0.9);
      display: flex;
      align-items: center;
      justify-content: space-around;
      padding: 0 150px;
      .contentSction{
        font-family: Arial;
        width: 250px;
        figure{
          width: 150px;
          height: 150px;
          border-radius: 50%;
          background: #264710;
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 0 0 10px;
          margin: 0 auto;
        }
      }
    }
  }
  .category {
    display: flex;
    justify-content: space-between;;
    .cardList {
      position: relative;
      width: 30%;
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
        background: #264710e6;
        color: white;
        img{
          width: 60%;
          height: 60%;
          transition: all 0.5s ease-out;
        }
      }
      span{
        display: block;
        color: $secondary;
        font-size: 100px;
        font-family: Yellowtail, cursive;
        font-weight: bold;
        letter-spacing: 5px;
        transition: 0.5s ease-out;
        text-shadow: 1px 1px rgba(0, 0, 0, 0.3), 2px 2px rgba(0, 0, 0, 0.3), 3px 3px rgba(0, 0, 0, 0.3),
        4px 4px rgba(0, 0, 0, 0.3), 5px 5px rgba(0, 0, 0, 0.3), 6px 6px rgba(0, 0, 0, 0.3);

      }
      &.lunchbox {
        background: url('https://hexschool-api.s3.us-west-2.amazonaws.com/custom/OPhdY2kmO8HAqDeuhKtYSjrASzxp7Pw1Aec1SlNBasCFMFltg3ZnHape0h8QrovzUQj2YkCyiTS3ZC4e4gdS8lXIc9FQU2wXh6QRlNNU2MGvsCQCo3nnkcwiTnAet9WY.jpg') no-repeat
          center center;
        background-size: cover;
      }
      &.sousvide{
        background: url('https://hexschool-api.s3.us-west-2.amazonaws.com/custom/H5qxPcglJ1S9RagBQnAT7pKkMgbFlgu7BRyydNvHaPhVkTnuXG6NLduRdk3zsHrfOKTpUzN2rCye7HTKc3JOkCBTe4XiX3fasKdKaM00jWOjiPcvPbxA8IXlPm1RleCK.jpg') no-repeat
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
</style>
