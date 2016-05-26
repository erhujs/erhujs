<template>
  <section class="window-content c-main">
    <div class="pane pane-sm sidebar" v-show="barStatus">
      <c-sidebar></c-sidebar>  
    </div>
    <div class="pane vbox">
      <c-network></c-network>
    </div>
    <div class="pane pane-sm">
      <c-content></c-content>
    </div>
  </section>
</template>

<script>
import Sidebar from './Sidebar.vue'
import Network from './Network.vue'
import Content from './Content.vue'

import settingsStore from '../store/settings/store.js'

export default {
  name: 'c-main',
  components: {
    'c-sidebar': Sidebar,
    'c-network': Network,
    'c-content': Content
  },
  store: settingsStore,
  vuex: {
    getters:{
      barStatus: state => state.bar
    }
  },
  data () {
    return {
      panel: {
        left: 20,
        middle: 60, 
        right: 20,
        minSize: 100
      }
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus">
.vbox
  display flex
  flex-direction column !important
  position relative
</style>