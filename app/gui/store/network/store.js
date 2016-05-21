/**
 * request store
 *
 * @param
 */

import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)

const state = {
  lists: []
}

const mutations = {
  ADD_NETWORK (state, req) {
    state.lists.push(parser(req))
  },

  DELETE_NETWORK (state, req) {
    state.lists.$remove(req)
  },

  TOGGLE_NETWORK (state, req) {
    req.done = !req.done
  },

  EDIT_NETWORK (state, req, text) {
    req.text = text
  },

  TOGGLE_ALL (state, done) {
    state.lists.forEach((req) => {
      req.done = done
    })
  },

  CLEAR_COMPLETED (state) {
    state.lists = state.lists.filter(req => !req.done)
  }
}

function parser(req){
  return {
    'result': req.statusCode || 200,
    'protocol': req.method,
    'host': req.host,
    'url': req.url,
    'body': req.body.length,
    'caching': '',
    'contentType': req.headers.accept,
    'process': '',
    'comments': '',
    'custom': '',
  }
}

export default new Vuex.Store({
  state,
  mutations
})
