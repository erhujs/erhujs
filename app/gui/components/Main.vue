<template>
  <section class="window-content c-main">
    <div class="pane pane-sm sidebar" v-show="barStatus">
      <c-sidebar></c-sidebar>  
    </div>
    <div class="pane">
      <c-request></c-request>
    </div>
    <div class="pane pane-sm">
      <c-content></c-content>
    </div>
  </section>
</template>

<script>
import Sidebar from './Sidebar.vue'
import Request from './Request.vue'
import Content from './Content.vue'

import settingsStore from '../store/settings/store.js'

export default {
  name: 'c-main',
  components: {
    'c-sidebar': Sidebar,
    'c-request': Request,
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

</style>