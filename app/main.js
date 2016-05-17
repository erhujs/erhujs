/* eslint-disable */
import Vue from 'vue'
import Vuex from 'vuex'
import App from './App'
import componentHandler from 'material-design-lite'
// import VueMdl from 'vue-mdl'

// Vue.use(VueMdl)

// Make vue aware of Vuex
Vue.use(Vuex)

window.componentHandler = componentHandler

new Vue({
  el: 'body',
  components: {
    App
  }
})