<template>
  <div class="About">
    <Navbar></Navbar>
    <LoadingPage :isLoading="isLoading"></LoadingPage>
    <div v-if="!isLoading">
      <div class="banner">
        <div class="Slogan">
          <div class="first">About Us</div>
          <span class="second">發掘蔬食的喜悅與美好</span>
        </div>
      </div>
      <div class="container">
        <div class="row">
          <div class="section d-flex my-5">
            <div class="col-md-7">
              <div class="title h1">Our Story</div>
              <h2 class="my-3">我們是Healthy Diet</h2>
              <div>
                <p>擁有健康的身體有很多種，可能是培養好的運動習、慣良好的生活作息，也有可能是飲食層面，如同Healthy Diet所提倡的，吃得健康!<br>
                  2020年起，健身風氣一年比一年旺，因緣際會開始烹煮水煮餐，不僅是為了健身、減重，外食族的我們，也為了健康、吃清淡與低調味，開始扭轉我們的飲食習慣。</p>
                <p>
                  我們秉持：<br>
                  EAT LOCAL 吃在地食材：挑選當季在地新鮮蔬菜，使用低脂優質肉類。<br>
                  EAT REAL 吃真正食物：拒絕使用再製加工品，選用大量天然食材；吃食物，不吃食品。<br>
                  EAT NATURAL 吃自然風味：烹煮使用水煮、水炒、清蒸等；不添加過多的調味料，保留食物原始的鮮、甘、甜。
                </p>
                <p>
                  EST 2020：
                  創立於2020年，勿忘我們創立Healthy Diet的初衷。<br>
                  Healthy Diet，期望能推廣健康無負擔的飲食，提供餐盒給所有喜愛我們的朋友們，陪伴大家走過這段長長的旅途！<br>
                  飲食，是關鍵中的關鍵！<br>吃什麼決定你是什麼樣的人，YOU ARE WHAT YOU EAT！
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

import Footer from '@/components/frontend/Footer'
export default {
  components: {
    LoadingPage,
    Navbar,
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

.About{
  .banner{
    background: url('https://images.unsplash.com/photo-1543352634-99a5d50ae78e?ixlib=rb-1.2.1&auto=format&fit=crop&w=1500&q=80') center center no-repeat;
  }
  .container .section{
    text-align: left;
    .title{
      position: relative;
      color: $primary;
      font-weight: bold;
      font-family: 'Yellowtail';
      padding: 10px;
      &::before{
        content: '';
        position: absolute;
        bottom: 0;
        width: 145px;
        height: 3px;
        background: $primary;
      }
    }
    .btn{
      border-radius: 50px;
      border: 1px solid $primary;
      background: transparent;
      color: $primary;
      padding: 5px 30px;
      margin-top: 50px;
    }
  }
}
</style>
