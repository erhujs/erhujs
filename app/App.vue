<template>
  <div class="window">
    <c-header></c-header>
    <section class="window-content">
      <div class="pane pane-sm sidebar">
        <c-sidebar></c-sidebar>  
      </div>
      <div class="pane">
        <c-main></c-main>
      </div>
      <div class="pane pane-sm">
        <c-content></c-content>
      </div>
    </section>
    <c-footer></c-footer>
  </div>
</template>

<script>
import electron from 'electron'
import config from './config.js'
import Header from './components/Header.vue'
import Sidebar from './components/Sidebar.vue'
import Main from './components/Main.vue'
import Content from './components/Content.vue'
import Footer from './components/Footer.vue'

const ipcRenderer = electron.ipcRenderer

export default {
  name: 'App',
  components: {
    'c-header': Header,
    'c-footer': Footer,
    'c-sidebar': Sidebar,
    'c-main': Main,
    'c-content': Content
  },
  props: {
  },
  computed: {
  },
  data () {
    return {
      reqList: [],
      panel: {
        left: 50,
        right: 50,
        minSize: 100
      },
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
