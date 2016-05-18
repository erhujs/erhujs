/* eslint-disable */
// material-design-lite lib
import 'material-design-lite/material.min.css'
import 'material-design-lite/material.min.js'

import Vue from 'vue'
import Vuex from 'vuex'
import VueMdl from 'vue-mdl'

import App from './App'

Vue.use(VueMdl)
Vue.use(Vuex)

new Vue({
  el: 'body',
  components: { App }
})