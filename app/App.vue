<template>
  <div class="mdl-layout mdl-js-layout">
    <c-header></c-header>
    <c-menu></c-menu>
    <main class="mdl-layout__content">
      <div class="page-content container">
        <c-panel :size="panel.left">
          <c-req-list :list="reqList"></c-req-list>
        </c-panel>
        <c-split :setting.sync="panel"></c-split>
        <c-panel :size="panel.right">
          <c-content :content="resContent"></c-content>
        </c-panel>  
      </div>
    </main>
    <c-footer></c-footer>
  </div>
</template>

<script>
import electron from 'electron'
import config from './config.js'
import Header from './components/Header.vue'
import Menu from './components/Menu.vue'
import Panel from './components/Panel.vue'
import Split from './components/Split.vue'
import Footer from './components/Footer.vue'
import ReqList from './components/ReqList.vue'
import Content from './components/Content.vue'

const ipcRenderer = electron.ipcRenderer

export default {
  name: 'App',
  components: {
    'c-header': Header,
    'c-menu': Menu,
    'c-split': Split,
    'c-panel': Panel,
    'c-footer': Footer,
    'c-req-list': ReqList,
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
    ipcRenderer.on('request', (event, request) => {
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
