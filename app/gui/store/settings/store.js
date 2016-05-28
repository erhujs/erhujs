/**
 * setting store
 *
 * @param
 */

import Vuex from 'vuex'
import Vue from 'vue'

Vue.use(Vuex)

const state = {
  bar: false,
  sidebar: [{
    id: 'favorites',
    title: 'Favorites',
    type: 'group',
    btn: false,
    show: false,
    list: [{
      icon: 'home',
      active: true,
      title: 'Home'
    }, {
      icon: 'download',
      active: false,
      title: 'Downloads'
    }, {
      icon: 'folder',
      active: false,
      title: 'Documents'
    }, {
      icon: 'signal',
      active: false,
      title: 'AirPlay'
    }, {
      icon: 'print',
      active: false,
      title: 'Applications'
    }, {
      icon: 'cloud',
      active: false,
      title: 'Desktop'
    }]
  }, {
    id: 'tags',
    title: 'Tags',
    type: 'group',
    btn: false,
    show: false,
    list: [{
      icon: 'record',
      active: true,
      title: 'Orange',
      color: '#fdbc40'
    }, {
      icon: 'record',
      active: false,
      title: 'Red',
      color: '#fc605b'
    }]
  }]
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