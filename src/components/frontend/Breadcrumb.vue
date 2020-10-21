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
  props: ['product']
}
</script>
