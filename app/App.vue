<template>
  <div class="window">
    <c-header></c-header>
    <c-main></c-main>
    <c-footer></c-footer>
  </div>
</template>

<script>
import electron from 'electron'

import Header from './components/Header.vue'
import Main from './components/Main.vue'
import Footer from './components/Footer.vue'

const ipcRenderer = electron.ipcRenderer

export default {
  name: 'App',
  components: {
    'c-header': Header,
    'c-main': Main,
    'c-footer': Footer
  },
  props: {
  },
  computed: {
  },
  data () {
    return {
      reqList: [],
      resContent: '',
      checked: false
    }
  },
  ready () {
    ipcRenderer.on('beforeRequest', (event, request) => {
      console.log(event, request)
      this.reqList.push({
        host: request.host,
        path: request.path,
        server: request.server
      })
    })
    ipcRenderer.on('response', (event, response) => {
      console.log(event, response)
      this.resContent = response.data.toString()
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
.container
	height 200px
	display flex
	border 1px solid #eee
</style>
