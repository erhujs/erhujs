/**
 * request store
 *
 * @param
 */
import RDPMessageFormatter from '../../util/rdp-message-formatter.js'
import config from '../config.js'
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)


let defaultColumns = getColumns()

let mock = Array.prototype.concat([], defaultColumns)
mock.shift()

const state = {
  columnsVisibility: config.defaultColumnsVisibility,
  columns: defaultColumns,
  connections: [mock, mock, mock, mock],
}

const mutations = {
  ADD_NETWORK (state, req) {
    state.connections.push(parser(req))
  },

  DELETE_NETWORK (state, req) {
    state.connections.$remove(req)
  },

  TOGGLE_NETWORK (state, req) {
    req.done = !req.done
  },

  EDIT_NETWORK (state, req, text) {
    req.text = text
  },

  TOGGLE_ALL (state, done) {
    state.connections.forEach((req) => {
      req.done = done
    })
  },

  CLEAR_COMPLETED (state) {
    state.connections = state.connections.filter(req => !req.done)
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
      item.width = 24
      item.left = 1
      columns.push(item)   
    }
  })

  return columns
}

export default new Vuex.Store({
  state,
  mutations
})
