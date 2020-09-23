<template>
  <div class="About">
    <Navbar></Navbar>
    <LoadingPage :isLoading="isLoading"></LoadingPage>
    <div v-if="!isLoading">
      <Banner :pageName="'About Us'" :content="'發掘蔬食的喜悅與美好'"></Banner>
      <div class="container">
        <div class="row">
          <div class="section">
            <div class="col-md-7">
              <div class="title h1">Our Story</div>
              <div>
                <p>擁有健康的身體有很多種，可能是培養好的運動習、慣良好的生活作息，也有可能是飲食層面，如同 Healthy Diet 所提倡的，吃得健康!</p>
                <p>健身風氣一年比一年旺，因緣際會開始烹煮水煮餐，不僅是為了健身、減重，外食族的我們，也為了健康、吃清淡與低調味，開始扭轉我們的飲食習慣。</p>
                <p>
                  我們秉持<br>
                  <ul>
                    <li><span class="text-success">Eat Local</span>：吃在地食材，挑選當季在地新鮮蔬菜，使用低脂優質肉類。</li>
                    <li><span class="text-success">Eat Real</span>：吃真正食物，拒絕使用再製加工品，選用大量天然食材；吃食物，不吃食品。</li>
                    <li><span class="text-success">Eat Natural </span>：吃自然風味，烹煮使用水煮、水炒、清蒸等；不添加過多的調味料，保留食物原始的鮮、甘、甜。</li>
                  </ul>
                </p>
                <p>
                  創立於 2020 年，<br>
                  期望能推廣健康無負擔的飲食，提供餐盒給所有喜愛我們的朋友們，陪伴大家走過這段長長的旅途！<br>
                  健康的生活，「飲食」是關鍵中的關鍵！<br>吃什麼決定你是什麼樣的人，<span class="text-success">YOU ARE WHAT YOU EAT！</span>
                </p>
              </div>
            </div>
            <div class="col-md-5 d-flex flex-column justify-content-center text-center">
              <img src="@/assets/logo.png" class="img-fluid">
              <router-link to="/products"><button class="btn">立即訂購</button></router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import LoadingPage from '@/components/frontend/LoadingPage'
import Navbar from '@/components/frontend/Navbar'
import Banner from '@/components/frontend/Banner'
import Footer from '@/components/frontend/Footer'

export default {
  components: {
    LoadingPage,
    Navbar,
    Banner,
    Footer
  },
  data () {
    return {
      category: true,
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
$secondary: #FEC81A;
$contrast: #800000;
$bgD:#CED4DA;
$bgL:#F7F7F7;
$dark: #474747;

.About{
  font-weight: bold;
  .banner{
    width: 100%;
    background: url('https://images.unsplash.com/photo-1543352634-99a5d50ae78e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80') center center no-repeat;
    background-size: cover;
    background-attachment: fixed;
  }
  .container .section{
    display: flex;
    margin-bottom: 48px;
    text-align: left;
    .title{
      position: relative;
      color: $primary;
      font-weight: bold;
      font-family: 'Yellowtail';
      padding: 10px 0;
      margin-bottom: 16px;
              display: inline-block;

      &::before{
        content: '';
        position: absolute;
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
        width: 50%;
        height: 3px;
        background: $primary;
      }
    }
    .btn{
      border-radius: 50px;
      border: 1px solid $contrast;
      color: $contrast;
      padding: 5px 30px;
      margin-top: 50px;
      &:hover{
        border: 1px solid $contrast;
        background: $contrast;
        color: #fff;
      }
    }
  }
  @media screen and (max-width: 767px) {
    .section{
      flex-direction: column;
      .title{
        font-size: 28px;
      }
    }
  }
}
</style>
