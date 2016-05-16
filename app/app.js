/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import VueMdl from 'vue-mdl'

Vue.use(VueMdl)

// Make vue aware of Vuex
Vue.use(Vuex)

new Vue({
  el: 'body',
  components: {
    App
  }
})