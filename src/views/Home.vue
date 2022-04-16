<template>
  <div class="container">
  <main class="main">
    <form @submit.prevent="submitHandler" class="form">
      <div class="mb-3">
        <div class="input-group mb-3  w-75 main-input">
          <span class="input-group-text" id="basic-addon2"><i class="fas fa-feather-alt"></i></span>
          <input class="btn btn-primary" type="submit" name="add" value="Создать">
          <input type="text"
                 name="description"
                 class="form-control p-3"
                 placeholder="Введите запись"
                 autocomplete
                 v-model="description"
                 v-focus
          >
        </div>
      </div>
    </form>
    <div class="d-flex justify-content-between  align-items-center border-bottom mb-3 p-2">
      <div class="items-count text-white">всего записей: <span class="text-info">{{ records.length }}</span></div>
    </div>
    <section>
      <div class="text-center text-danger fs-5" v-if="!records.length">записей нет</div>
      <table class="table table-dark table-bordered table-hover table-responsive" v-else>
        <thead>
        <tr class="text-center">
          <th scope="col">№</th>
          <th scope="col">Описание</th>
          <th scope="col">Статус</th>
          <th class="" scope="col">Дата</th>
        </tr>
        </thead>
        <tbody>
        <tr v-for="(record, idx) in records" :key="record._id" class="border-bottom-tr">
          <th scope="row" class="text-center text-white-50">{{ idx + 1 }}</th>
          <td class="text-wrap break-word">
            {{ record.description }}
          </td>
          <td class="text-center">
            <small>{{ record.status }}</small>
            <div class="form-switch d-flex justify-content-center align-items-center">
              <input class="form-check-input" type="checkbox">
            </div>
          </td>
          <td>
            <div class="d-flex justify-content-center align-items-center">
              <small class="mb-2 text-center text-info">{{ record.timestamp }}</small>
              <div class="buttons mx-3 d-flex">
                <a href="#" class="text-danger mx-2" @click="removeDataHandler"><i
                  class="fa fa-trash-alt fa-lg"></i></a>
                <!--                <a href="#"><i-->
                <!--                  class="fa fa-edit fa-lg"></i></a>-->
              </div>
            </div>
          </td>
        </tr>
        </tbody>
      </table>
    </section>
  </main>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue'
import useDatabase from '../use/useDatabase'

export default {
  name: 'Home',
  setup () {
    const description = ref('')
    const records = ref([])
    const {
      addData,
      getAllData,
      removeData
      // updateData
    } = useDatabase()
    const submitHandler = async () => {
      if (description.value) {
        records.value.push(await addData(description.value))
      }
      description.value = ''
    }
    // const updateDataHandler = async () => {
    //   await updateData
    // }
    const removeDataHandler = async () => {
      await removeData()
      records.value = await getAllData()
    }
    onMounted(async () => {
      records.value = await getAllData()
    })
    return {
      submitHandler,
      // updateDataHandler,
      removeDataHandler,
      description,
      records
    }
  }
}
</script>

<style scoped>
.border-bottom-tr {
  border-bottom: transparent !important;
}

.break-word {
  word-break: break-word !important;
  white-space: break-spaces !important;
}

.main-input {
  margin: 0 auto;
}

.form {
  margin-top: -3rem !important;
}

/*.list-enter-active,*/
/*.list-leave-active {*/
/*  transition: all 0.5s ease!important;*/
/*}*/
/*.list-enter-from,*/
/*.list-leave-to {*/
/*  opacity: 0!important;*/
/*  transform: translatex(30px)!important;*/
/*}*/
/*.list-leave-active {*/
/*  position: absolute!important;*/
/*}*/
</style>
