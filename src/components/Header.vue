<template>
  <header class="p-3 bg-dark text-white mb-2 text-hover">
    <div class="d-flex flex-wrap align-items-center justify-content-center flex-column">
      <div class="d-flex info mb-2">
        <div><span class=" text-info me-3">{{ dateTime }}</span></div>
        <div>Пользователь:&nbsp;<span class=" text-info me-3">{{ userName }}</span></div>
        <div>Имя пк:&nbsp;<span class=" text-info me-3">{{ hostName }}</span></div>
        <div>upTime:&nbsp;
          <span class=" text-info me-3"><span v-if="upTime.hours > 0">{{ upTime.hours }}ч.</span>
            <span v-if="upTime.minutes < 60">&nbsp;{{upTime.minutes}} мин.</span></span></div>
      </div>
      <div class="menu fs-5">
        <ul class="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0 navigation">
          <li>
            <router-link to="/" class="nav-link px-2 text-white nav-link-hover outline-none">Главная</router-link>
          </li>
          <li>
            <router-link to="/applications" class="nav-link px-2 text-white nav-link-hover">Заявки</router-link>
          </li>
          <li>
            <router-link to="/tmc" class="nav-link px-2 text-white nav-link-hover">ТМЦ</router-link>
          </li>
          <li>
            <router-link to="/rm" class="nav-link px-2 text-white nav-link-hover">РМ</router-link>
          </li>
          <li>
            <router-link to="/tmc-video" class="nav-link px-2 text-white nav-link-hover">ТМЦ-video</router-link>
          </li>
          <li>
            <router-link to="/departments" class="nav-link px-2 text-white nav-link-hover">Отделы</router-link>
          </li>
          <li>
            <router-link to="/reports" class="nav-link px-2 text-white nav-link-hover">Отчеты</router-link>
          </li>
          <li>
            <router-link to="/trash" class="nav-link px-2 text-primary"><i
              class="far fa-arrow-alt-circle-right me-1 nav-link-hover"></i>
              <i class="fas fa-dumpster nav-link-hover"></i></router-link>
          </li>
        </ul>
      </div>
    </div>
  </header>
</template>

<script>
import useOs from '@/use/useOs'

export default {
  name: 'Header',
  setup () {
    return {
      ...useOs()
    }
  }
}
</script>

<style scoped>
.active {
  color: brown !important;
}
.nav-link-hover:hover {
  text-shadow: 0 2px 4px brown, 0 2px 8px brown;
}

.outline-none {
  outline: none !important;
}

header {
  margin-bottom: 4.75rem !important;
}
</style>
