<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark justify-content-between">
      <a class="navbar-brand" href="#">Logo</a>
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarNavAltMarkup"
        aria-controls="navbarNavAltMarkup"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="navbar-toggler-icon"></span>
      </button>

      <div class="text-center">
        <ul class="navbar-nav">
          <li class="nav-item active">
            <router-link class="nav-link" to="/products">產品列表</router-link>
          </li>
          <li class="nav-item">
            <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Disabled</a>
          </li>
        </ul>
      </div>
      <div class="text-right">
        <button class="btn btn-outline-light my-2" type="submit">登出</button>
      </div>
    </nav>
    <router-view></router-view>
  </div>
</template>

<script>
export default {}
</script>

<style>
</style>
