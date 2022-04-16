<template>
  <div class="app text-white" v-cloak>
    <div class="container-fluid mt-3">
      <Header/>
      <router-view></router-view>
    </div>
  </div>
</template>

<style lang="scss">
[v-cloak] {
  display: none !important;
}

.copy {
  text-shadow: 0 1px 2px black, 0 2px 2px black;
  color: transparent!important;
  position: relative !important;
  background: rgb(166, 51, 51, .5) !important;
  box-shadow: 0 2px 4px #c6c25e !important;
}

.copy-target {
  position: absolute !important;
  top: 50% !important;
  left: 50% !important;
  transform: translate(-50%, -50%) !important;
}

.searchPos {
  width: 60% !important;
  position: fixed !important;
  transform: translate(0, -120%) !important;
}

.hide {
  opacity: 0 !important;
  transition: all .5s !important;
}

.hr-height {
  height: 3px;
  box-shadow: 0 2px 4px brown;
}
</style>
<script>
import { onMounted } from 'vue'
import { useStore } from 'vuex'
import Header from './components/Header'
import scrollPosition from './utils/scrollPosition'

export default {
  components: { Header },
  setup () {
    const store = useStore()
    onMounted(async () => {
      scrollPosition()
      await store.dispatch('applications/getApplications', 'загружено')
    })
    return {}
  }
}
</script>
