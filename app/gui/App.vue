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

import { addNet } from './store/network/actions.js'
import networkStore from './store/network/store.js'

const ipcRenderer = electron.ipcRenderer

export default {
  name: 'App',
  components: {
    'c-header': Header,
    'c-main': Main,
    'c-footer': Footer
  },
  store: networkStore,
  vuex: {
    actions: {
      addNet
    }
  },
  data () {
    return {
      reqList: [],
      resContent: ''
    }
  },
  created () {

    // ipcRenderer.on('request', (event, request) => {
    //   console.log('request', request)
    // })
    // ipcRenderer.on('request-data', (event, request) => {
    //   console.log('request-data', request)
    // })
    // ipcRenderer.on('request-end', (event, request) => {
    //   console.log('request-end', request)
    // })
    // ipcRenderer.on('connected', (event, request) => {
    //   console.log('connected', request)
    // })
    // ipcRenderer.on('response', (event, request, response) => {
    //   console.log('response', response)
    // })
    // ipcRenderer.on('response-data', (event, request, response) => {
    //   console.log('response-data', response)
    // })
    
    // 感觉一个 response-end 就获取到请求和相应的相关数据了... 不过这样好像不是很好，没了过程？
    ipcRenderer.on('response-end', (event, request, response) => {
      this.addNet(request, response)
    })
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
