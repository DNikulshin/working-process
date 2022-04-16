<template>
  <div class="container">
    <div class="d-flex justify-content-center" v-if="loading">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
      <span class="d-flex justify-content-center align-items-center mx-2">Загрузка данных...</span>
    </div>
   <div class="page" v-else>
    <div class="search m-3">
      <input type="search" class="form-control searchPos p-2 fs-4" placeholder=" Поиск..." aria-label="Search"
             v-model="search"
      >
    </div>
    <div class="d-flex flex-wrap justify-content-between align-items-center">
      <div class="justify-content-start align-items-center">
        <div v-show="searchItems.length" class="mb-1">
          Всего заявок: <span class="text-info">{{ searchItems.length }}</span>
        </div>
      </div>
      <div class="text-center">
        <small class="text-primary"><span class="text-success">{{ updateDate.status }}:&nbsp;</span>{{ updateDate.date }}</small>
        <button class="btn btn-info btn-sm mx-2" @click="updateDateItems">
          <i class="bi bi-arrow-clockwise"></i>
        </button>
      </div>
<!--      <input type="text" @input="$event = allSelectedInputValue">-->
      <div v-if="listItems.length" class="d-flex flex-nowrap mb-1">
        <input type="date"
               v-model="currentDate"
               @change="filterByDate"
               class="me-1 p-1">
        <button class="btn btn-light" @click="clearDate">очистить</button>
      </div>
    </div>
    <table class="table table-dark table-bordered table-hover table-responsive fs-6" @click="copyToClipboard">
      <thead>
      <tr class="text-center">
        <th scope="col">№</th>
        <th scope="col">Код</th>
        <th scope="col">Маг.</th>
        <th scope="col">Адрес</th>
        <th scope="col">Депорт.</th>
        <th scope="col">Текст</th>
        <th scope="col">Дата</th>
        <th scope="col">Тип.</th>
      </tr>
      </thead>
      <tbody>
      <transition-group name="post-list">
        <tr v-for="(item, idx) in searchItems" :key="item.id" class="offset-11">
          <th scope="row" class="text-center d-flex justify-content-center align-items-center flex-column">
            <small>{{ idx + 1 }}</small>
            <!--            <div class="loading-action" v-if="loadingAction">loading...</div>-->
            <div>
              <button
                @click.prevent.stop="setAccept($event, item.id)"
                class="mb-3 mt-2 btn-accept btn-success" title="принять">
                <i class="bi bi-check2"></i>
              </button>
              <div>
                <button
                  @click.prevent.stop="setCancel($event, item.id)"
                  class="text-danger btn-cancel btn-danger text-white" title="отменить">
                  <i class="bi bi-x"></i>
                </button>
                <input type="text" class="position-absolute mx-2 visually-hidden" :id="item.id"
                       :autocomplete="inputValue"
                       @blur="!inputValue"
                       @keydown.enter.stop="setCancel($event, item.id)"
                >
              </div>
            </div>
          </th>
          <td class="text-primary cursor-copy"><small>{{ item.id }}</small></td>
          <td class="text-wrap text-center cursor-copy">{{ item.shop }}</td>
          <td class="text-wrap text-center text-info cursor-copy">{{ item.address }}</td>
          <td class="text-center text-secondary">{{ item.department }}</td>
          <td class="text-wrap text-center">{{ item.text }}</td>
          <td class="text-center text-primary">{{ item.date }}</td>
          <td class="text-center text-info" v-if="typeof item.type  === 'object' ? item.type = 'необраб.' : item.type">
            {{ item.type }}
          </td>
        </tr>
      </transition-group>
      </tbody>
    </table>
    <div class="m-3 p-3 text-danger text-center" v-show="!searchItems.length">
      <hr class="hr-height"/>
      <strong>Нет результатов поиска</strong>
    </div>
  </div>
  </div>
</template>

<script>
import { computed, onBeforeMount, ref } from 'vue'
import { useStore } from 'vuex'
import useApplications from '@/use/useApplications'
import copyToClipboard from '@/utils/CopyToClipboard'

export default {
  name: 'Applications',
  setup () {
    const {
      actionClaim
    } = useApplications()
    const store = useStore()
    const search = ref('')
    const canCopy = ref(false)
    const cancel = ref('отмена')
    const inputValue = ref('')
    const dateTime = ref(new Date().toLocaleString())
    const currentDate = ref(null)
    const formatDate = ref(null)
    onBeforeMount(() => {
      canCopy.value = !!navigator.clipboard
    })
    const searchItems = computed(() =>
      store.getters['applications/getListItems']
        .filter(item => {
          if (!search.value) {
            return store.getters['applications/getListItems']
          }
          if (item.text.toLowerCase().indexOf(search.value.toLowerCase()) !== -1) {
            return item
          }
        })
        .filter(item => {
          const formatDateItem = item.date.split(' ').splice(0, 1).join()
          if (currentDate.value === null) {
            return store.getters['applications/getListItems']
          }
          if (formatDate.value === formatDateItem) {
            return item
          }
        })
    )
    const filterByDate = () => {
      formatDate.value = new Date(currentDate.value).toLocaleDateString()
    }
    const clearDate = () => {
      currentDate.value = null
    }
    const setAccept = async (event, id) => {
      const targetInputId = event.target.closest('th').querySelector('input').id
      if (targetInputId === id) {
        await actionClaim(1, id)
      }
      console.log(targetInputId)
    }
    const setCancel = async (event, id) => {
      const targetInput = event.target.closest('th').querySelector('input')
      const targetInputValue = event.target.closest('th').querySelector('input').value
      const targetInputId = event.target.closest('th').querySelector('input').id
      if (targetInputId === id) {
        inputValue.value = targetInputValue
        targetInput.classList.toggle('visually-hidden')
        // event.target.classList.remove('bi-x')
        // event.target.classList.add('bi-send')
        if (inputValue.value) {
          // event.target.classList.add('bi-send')
          // event.target.classList.remove('bi-x')
          await actionClaim(0, id, inputValue.value)
        } else {
          // event.target.target.classList.remove('bi-send')
          // event.target.classList.add('bi-x')
        }
      }
    }
    return {
      copyToClipboard,
      search,
      actionClaim,
      updateDate: computed(() => store.getters['applications/getUpdateDate']),
      loading: computed(() => store.getters['applications/getLoading']),
      listItems: computed(() => store.getters['applications/getListItems']),
      searchItems,
      cancel,
      setCancel,
      setAccept,
      inputValue,
      dateTime,
      currentDate,
      filterByDate,
      formatDate,
      clearDate,
      updateDateItems: async () => await store.dispatch('applications/getApplications', 'обновлено')
    }
  }
}
</script>

<style scoped>
.post-list-enter-active,
.post-list-leave-active {
  transition: all .3s ease;
}

.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translate(0, 50%);
}

.post-list-move {
  transition: transform .5s ease;
}

.cursor-copy {
  cursor: copy !important;
}

.cursor-copy:hover {
  /*background: darkolivegreen!important;*/
  box-shadow: 0 2px 4px darkolivegreen, 0 2px 8px darkolivegreen !important;

}
</style>
