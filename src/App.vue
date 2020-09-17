<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import '@/assets/all';
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Mrs+Sheppards&family=Yellowtail&display=swap');

$primary : #204969;
$secondary: #de9e36;
$bgD:#CED4DA;
$bgL:#F7F7F7;

html,body{
  height: 100%;
  margin:0;
  background-color: white;
}
#app {
height: 100%;
  font-family: 'Roboto','Noto Sans TC', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: black;
  .banner {
    width: 100%;
    height: 100vh;
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
        color: $primary;
        padding-right: 20px;
      }
      & .second{
        padding: 0px 20px;
        border: 1px solid $primary;;
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.06);
        font-size: 24px;
        font-weight: bold;
        color: $primary;;
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
  .table th, .table td {
    vertical-align: middle;
  }
  a{
    text-decoration: none;
  }
  .block{
    height: 0px;
  }
  .header{
    width: 100%;
    height: 40px;
    background: #F7F7F7;
    text-align: left;
    font-size: 17px;
    line-height: 28px;
    padding: 6px 12px;
  }
  .container > .row{
    padding: 0 70px;
    height: 100%;
  }
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
