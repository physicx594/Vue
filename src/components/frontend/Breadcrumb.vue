<template>
  <div class="breadcrumb p-0">
      <div class="block-inner container">
        <router-link to="/">首頁</router-link>
        <router-link to="/products">全部商品</router-link>
        <span>{{ product.title }}</span>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Breadcrumb',
  props: ['product']
}
</script>

<style lang="scss">
$primary : #264710;
$secondary: #FEC81A;
$contrast: #800000;
$bgD:#CED4DA;
$bgL:#F7F7F7;
$dark: #474747;

.breadcrumb{
    font-size: 13px;
    background: rgba(247, 247, 247, 0.98);
    color: #999;
    .block-inner{
        margin: 0 auto;
        text-align: left;
        padding: 5px 15px;
        a{
            color: inherit;
            &::after{
                content: " / ";
            }
        }
        span{
            color: $contrast;
            font-weight: bold;
        }
    }
}
</style>
