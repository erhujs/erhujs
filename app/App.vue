<template>
  <div class="mdl-layout mdl-js-layout">
    <c-header></c-header>
    <c-menu></c-menu>
    <main class="mdl-layout__content">
      <div class="page-content container">
        <c-panel :size="panel.left">
          <ul class="req-list">
            <li>
              <c-item :req="reqHead" index="#"></c-item>
            </li>
            <li v-for="it in reqList">
              <c-item :req="it"></c-item>
            </li>
          </ul>
        </c-panel>
        <c-split :setting.sync="panel"></c-split>
        <c-panel :size="panel.right">
          <span>Content: <br>{{resContent}}</span>
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
import Item from './components/Item.vue'

const ipcRenderer = electron.ipcRenderer
export default {
  name: 'App',
  components: {
    'c-header': Header,
    'c-menu': Menu,
    'c-split': Split,
    'c-panel': Panel,
    'c-footer': Footer,
    'c-item': Item,
  },
  props: {
  },
  computed: {
  },
  data () {
    return {
      reqHead: config.reqHead,
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
    console.log('xxx')
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
