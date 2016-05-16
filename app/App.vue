<template>
  <div>
    <c-header></c-header>
    <ul class="req-list">
      <li>
        <c-item :req="reqHead"></c-item>
      </li>
      <li v-for="it in reqList">
        <c-item :req="it"></c-item>  
      </li>
    </ul>
  </div>
</template>

<script>
import Header from './components/Header.vue'
import Item from './components/Item.vue'
import electron from 'electron'
const ipcRenderer = electron.ipcRenderer

export default {
  name: 'App',
  components: {
    'c-header': Header,
    'c-item': Item
  },
  props: {
  },
  computed: {
  },
  data () {
    return {
      reqHead: {
        host: 'host',
        path: 'path',
        server: 'server'
      },
      reqList: []
    }
  },
  ready () {
    ipcRenderer.on('request', (event, request) => {
      console.log(event, request
        )
      this.reqList.push({
        host: request.host,
        path: request.path,
        server: request.server
      })
    })
    ipcRenderer.on('response', (event, response) => {
    })
  },
  methods: {
    
  }
}
</script>

<style lang="stylus">
.req-list
  margin 0
  padding 0
  li
    list-style none
</style>