<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import '@/assets/all';
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100&display=swap');

html,body{
  height: 100%;
  margin:0;
}
#app {
height: 100%;
  font-family: 'Noto Sans TC', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: black;
  .table th, .table td {
    vertical-align: middle;
  }
  a{
    text-decoration: none;
  }
  .block{
    height: 64px;
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
