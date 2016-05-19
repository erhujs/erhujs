import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const state = {
  bar: false
}

const mutations = {
  TOGGLER_BAR (state, text) {
    state.bar = !state.bar
  }
}

export default new Vuex.Store({
  state,
  mutations
})