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
  ready () {

    ipcRenderer.on('request', (event, request) => {
      console.log('Request', request)
      this.addNet(request)
    })
    ipcRenderer.on('response-end', (event, request, response) => {
      console.log('Response', response)
      this.resContent = response.data.toString()
    })
    mock(this)
  }
}

function mock(vm){
  vm.addNet(JSON.parse('{"body":{"type":"Buffer","data":[]},"headers":{"accept":"*/*","host":"lib.sinaapp.com","proxy-connection":"Keep-Alive","user-agent":"curl/7.43.0"},"host":"lib.sinaapp.com","id":"SJg51aE2f","method":"GET","path":"http://lib.sinaapp.com/js/jquery/2.0.3/jquery-2.0.3.min.js","port":80}'))

  vm.addNet(JSON.parse('{"body":{"type":"Buffer","data":[]},"headers":{"accept":"*/*","host":"lib.sinaapp.com","proxy-connection":"Keep-Alive","user-agent":"curl/7.43.0"},"host":"lib.sinaapp.com","id":"SJg51aE2f","method":"GET","path":"http://lib.sinaapp.com/js/jquery/2.0.3/jquery-2.0.3.min.js","port":80}'))

  vm.addNet(JSON.parse('{"body":{"type":"Buffer","data":[]},"headers":{"accept":"*/*","host":"lib.sinaapp.com","proxy-connection":"Keep-Alive","user-agent":"curl/7.43.0"},"host":"lib.sinaapp.com","id":"SJg51aE2f","method":"GET","path":"http://lib.sinaapp.com/js/jquery/2.0.3/jquery-2.0.3.min.js","port":80}'))
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
