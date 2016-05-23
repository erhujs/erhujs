/**
 * request store
 *
 * @param
 */
import config from '../config.js'
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)


let defaultColumns = getColumns()

const state = {
  columnsVisibility: config.defaultColumnsVisibility,
  columns: defaultColumns,
  lists: [],
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

function parser (req) {
  return {
    "name": req.url,
    "method": req.method,
    "status": req.statusCode || 200,
    "protocol": "Protocol",
    "scheme": "Scheme",
    "domain": req.host,
    "remoteAddress": "Remote Address",
    "type": "Type",
    "initiator": "Initiator",
    "cookies": "Cookies",
    "setCookies": "Set-Cookies",
    "size": req.body.length,
    "time": "Time",
    "connectionId": "Connection Id",
    "priority": "Priority",
    "timeline": "Timeline",

    // Response header columns
    "Cache-Control": "Cache-Control",
    "Connection": "Connection",
    "Content-Encoding": "Content-Encoding",
    "Content-Length": "Content-Length",
    "ETag": "ETag",
    "Keep-Alive": "Keep-Alive",
    "Last-Modified": "Last-Modified",
    "Server": "Server",
    "Vary": "Vary"
  }

  return columns
}

function getColumns(){
  let columns = []
  
  config.defaultColumns.forEach( (item) => {
    if(config.defaultColumnsVisibility[item.id]){
      columns.push(item)   
    }
  })

  return columns
}

export default new Vuex.Store({
  state,
  mutations
})
