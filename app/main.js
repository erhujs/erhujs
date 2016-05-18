/* eslint-disable */
import './node_modules/material-design-lite/material.min.css'

import Vue from 'vue'
import Vuex from 'vuex'
import componentHandler from 'material-design-lite'
// import VueMdl from 'vue-mdl'

import App from './App'

// Vue.use(VueMdl)
// Make vue aware of Vuex
Vue.use(Vuex)

window.componentHandler = componentHandler

new Vue({
  el: 'body',
  components: { App }
})