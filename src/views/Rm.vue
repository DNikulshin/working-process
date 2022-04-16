<template>
  <div class="container">
    <div class="search m-3">
      <input type="search" class="form-control searchPos p-2 fs-4" placeholder=" Поиск..." aria-label="Search"
             v-model="search"
             v-focus
      >
    </div>
    <!--    <input type="file" ref="file" @change="handleFileUpload($refs)" v-show="!filterItems.length"/>-->
    <!--    <strong v-if="errors">{{ errors.warning }}</strong>-->
    <!--    <button @click="submitFile">Submit</button>-->
    <table class="table table-dark table-bordered table-hover table-responsive table-main" @click="copyToClipboard" v-if="filterItems.length">
      <thead>
      <tr class="text-center">
        <th scope="col">№</th>
        <th scope="col">Код</th>
        <th scope="col">Название</th>
        <th scope="col">(шт.)</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item, idx) in searchItems" :key="item.id">
        <th scope="row" class="text-center">{{ idx + 1 }}</th>
        <td class="text-primary">{{ item.id }}</td>
        <td class="text-wrap">{{ item.name }}</td>
        <td class="text-center text-info">{{ item.count }}</td>
      </tr>
      </tbody>
    </table>
    <div class="d-ld-flex mt-3 p-3 text-danger justify-content-center align-items-center flex-column"
         v-else-if="isNotExist || !filterItems.length">Файл пуст. Замените файл <strong class="text-primary">&nbsp;rm.htm&nbsp;</strong>
      <br>в папке :<span class="text-primary">&nbsp;{{ pathFoldr }}</span></div>
    <div class="m-3 p-3 text-danger text-center" v-show="!isNotExist && !searchItems.length">
      <hr class="hr-height"/>
      <strong>Нет результатов поиска</strong>
    </div>
  </div>
</template>

<script>
import { ref, onMounted, computed, onBeforeMount } from 'vue'
import useDataFile from '@/use/useDataFile'
import copyToClipboard from '@/utils/CopyToClipboard'
// import Search from '@/components/Search'

export default {
  name: 'Rm',
  // components: { Search },
  setup () {
    const { readFile, resultArray, pathFolder, isNotExist } = useDataFile('rm.htm')
    const canCopy = ref(false)
    const search = ref('')
    const items = ref(resultArray)
    onBeforeMount(() => {
      canCopy.value = !!navigator.clipboard
    })
    onMounted(() => {
      readFile()
    })
    const filterItems = computed(() => {
      return items.value.slice(11).filter(el => el.count !== '')
    })
    const pathFoldr = computed(() => {
      return pathFolder.replaceAll('/', '\\')
    })
    const searchItems = computed(() => {
      if (!search.value) {
        return filterItems.value
      }
      return filterItems.value.filter(item => {
        if (item.name.toLowerCase().indexOf(search.value.toLowerCase()) !== -1) {
          return item
        }
      })
    })
    return {
      filterItems,
      pathFoldr,
      searchItems,
      search,
      copyToClipboard,
      isNotExist
    }
  }
}
</script>

<style scoped>

</style>
