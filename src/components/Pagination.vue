<template>
  <div class="Pagination">
    <nav aria-label="Page navigation example">
      <ul class="pagination">
        <li class="page-item" :class="{ disabled: pages.current_page === 1 }">
          <a class="page-link" @click.prevent="pageNum(pages.current_page - 1)">
            <span aria-hidden="true">&laquo;</span>
            <span class="sr-only">Previous</span>
          </a>
        </li>
        <li
          class="page-item"
          v-for="(item, index) in pages.total_pages"
          :key="index"
          :class="{ active: pages.current_page === item, disabled: pages.current_page === item}"
        >
          <a class="page-link" @click.prevent="pageNum(item)" href="#" >
            {{ item }}
          </a>
        </li>
        <li class="page-item" :class="{ disabled: pages.current_page === pages.total_pages }">
          <a class="page-link" href="#" @click.prevent="pageNum(pages.current_page + 1)">
            <span aria-hidden="true" >&raquo;</span>
            <span class="sr-only">Next</span>
          </a>
        </li>
      </ul>
    </nav>
  </div>
</template>

<script>
export default {
  props: ['pages'],
  methods: {
    pageNum (item) {
      this.$emit('update', item)
    }
  }
}
</script>

<style lang="scss">
.Pagination {
  .page-link {
    color: #343a40;
    &:focus {
      box-shadow: none;
    }
  }
  .active .page-link,
  .page-link:hover {
    color: #fff;
    background-color: #343a40;
    border-color: #343a40;
  }
}
</style>
