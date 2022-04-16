<template>
  <div class="search m-3">
    <input type="search" class="form-control searchPos p-2 fs-4 search" placeholder=" Поиск..." aria-label="Search"
           v-model="searchValue">
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'Search',
  props: {
    search: String
  },
  setup (props) {
    const searchValue = computed((arr) => {
      return arr.filter(item => {
        return item.name.toLowerCase().includes(props.search.toLowerCase())
      })
    })
    return {
      searchValue
    }
  }
}
</script>

<style scoped>

</style>
