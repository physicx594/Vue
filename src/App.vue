<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<style lang="scss">
@import '@/assets/all';
@import url('https://fonts.googleapis.com/css2?family=Noto+Sans+TC:wght@100&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Mrs+Sheppards&family=Yellowtail&display=swap');

$primary : #264710;
$secondary: #de9e36;
$bgD:#CED4DA;
$bgL:#F7F7F7;

html,body{
    // max-width: 1440px;
  height: 100%;
  margin:0;
  background-color: white;
}
#app {
height: 100%;
  font-family: 'Arial','Noto Sans TC', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: black;
  .table th, .table td {
    vertical-align: middle;
  }
  a{
    text-decoration: none;
  }
  .header{
    width: 100%;
    height: 40px;
    color: $primary;
    background: #F7F7F7;
    text-align: left;
    font-size: 17px;
    font-weight: bold;
    line-height: 28px;
    padding: 6px 12px;
  }
  .container > .row{
    padding: 0 70px;
    height: 100%;
  }
  @media screen and (max-width: 768px) {
    .container > .row{
      padding: 0;
    }
  }
}

</style>
