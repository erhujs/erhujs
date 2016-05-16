/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App.vue'

// Make vue aware of Vuex
Vue.use(Vuex)

new Vue({
  el: 'body',
  components: {
    App
  }
})