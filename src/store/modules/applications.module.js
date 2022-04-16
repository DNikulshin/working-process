import useApplications from '../../use/useApplications'

export default {
  namespaced: true,
  state: {
    listItems: [],
    loading: false,
    updateDate: {
      date: null,
      status: ''
    }
  },
  mutations: {
    setItems (state, items) {
      state.listItems = items
    },
    setLoading (state, bool) {
      state.loading = bool
    },
    setUpdateDate (state, status) {
      state.updateDate.date = new Date().toLocaleString()
      state.updateDate.status = status
    },
    filterItems (state, id) {
      state.listItems = state.listItems.filter(el => el.id !== id)
    }
  },
  actions: {
    async getApplications ({ commit }, status) {
      const { listItems, getDataFromWebsite } = useApplications()
      commit('setLoading', true)
      await getDataFromWebsite()
      commit('setItems', listItems)
      commit('setLoading', false)
      commit('setUpdateDate', status)
    }
  },
  getters: {
    getListItems (state) {
      return state.listItems
    },
    getLoading (state) {
      return state.loading
    },
    getUpdateDate (state) {
      return state.updateDate
    }
  }
}
