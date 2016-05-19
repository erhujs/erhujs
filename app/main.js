/* eslint-disable */
import './main.styl'

import Vue from 'vue'
import Vuex from 'vuex'
import photon from './ui/photon'
import App from './App'

Vue.use(Vuex)

Vue.component('p-actionbar', photon.Actionbar)
Vue.component('p-button', photon.Button)
Vue.component('p-button-group', photon.ButtonGroup)
Vue.component('p-checkbox', photon.CheckBox)
Vue.component('p-icon', photon.Icon)
Vue.component('p-input', photon.Input)
Vue.component('p-list-group', photon.ListGroup)
Vue.component('p-list-item', photon.ListItem)
Vue.component('p-nav-group', photon.NavGroup)
Vue.component('p-nav-group-item', photon.NavGroupItem)
Vue.component('p-navtitle', photon.NavTitle)
Vue.component('p-options', photon.Options)
Vue.component('p-pane', photon.Pane)
Vue.component('p-pane-group', photon.PaneGroup)
Vue.component('p-radio', photon.Radio)
Vue.component('p-radio-group', photon.RadioGroup)
Vue.component('p-tab-group', photon.TabGroup)
Vue.component('p-tabitem', photon.TabItem)
Vue.component('p-table', photon.Table)
Vue.component('p-textarea', photon.TextArea)

new Vue({
  el: 'body',
  components: { App }
})