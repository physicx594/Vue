import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isLoading: false
  },
  actions: {
    updateLoading (context, payload) {
      context.commit('LOADING', payload)
    }
  },
  mutations: {
    LOADING (state, payload) {
      state.isLoading = payload
    }
  },
  getters: {}
})
