import { createStore, createLogger } from 'vuex'
import applicationsModule from '@/store/modules/applications.module'

export default createStore({
  plugins: [createLogger()],
  state: {},
  mutations: {},
  actions: {},
  getters: {},
  modules: {
    applications: applicationsModule
  }
})
