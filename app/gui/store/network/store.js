/**
 * request store
 *
 * @param
 */
import RDPMessageFormatter from '../../util/rdp-message-formatter.js'
import capturedConnection from '../../util/captured-connection.js'
import config from '../config.js'
import Vuex from 'vuex'
import Vue from 'vue'
Vue.use(Vuex)
console.log(capturedConnection)

let defaultColumns = getColumns()

let mock = Array.prototype.concat([], defaultColumns)
mock.shift()

const state = {
  columnsVisibility: config.defaultColumnsVisibility,
  columns: defaultColumns,
  connections: [],
}

const mutations = {
  ADD_NETWORK (state, req, res) {
    state.connections.push(parser(state, req, res))
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

/**
 * parser connection
 * TODO 很多字段没有补全
 *
 * @param
 */

function parser (state, req, res) {
  let connection = []
  let _parserValue = {
    "name": req.url,
    "path": req.path,
    "method": req.method,
    "status": res.statusCode,
    "statusText": res.statusMessage,
    "protocol": req.protocol,
    "scheme": "Scheme",
    "domain": req.host,
    "remoteAddress": res.remoteAddress,
    "type": capturedConnection.getResourceType(res.headers['content-type']),
    "initiator": "Initiator",
    "cookies": "Cookies",
    "setCookies": "Set-Cookies",
    "size": res.data.length,
    "sizeContent": '100kb',
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

  state.columns.forEach( (item) => {
    if(item.id === 'index'){
      return
    }
    connection.push({
      id: item.id,
      title: _parserValue[item.id],
      subId: item.subId,
      sub: _parserValue[item.subId],
    })
  })

  return connection
}

/**
 * get columns by defaultColumns and defaultColumnsVisibility
 *
 * @return {Array} columns
 */

function getColumns(){
  let columns = []

  config.defaultColumns.forEach( (item) => {
    if(config.defaultColumnsVisibility[item.id]){
      item.width = 24
      item.left = 0
      columns.push(item)
    }
  })

  return columns
}

export default new Vuex.Store({
  state,
  mutations
})
