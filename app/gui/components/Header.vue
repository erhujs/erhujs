<template>
  <header class="c-header toolbar toolbar-header">
    <h1 class="title">{{title}}</h1>
    <div class="toolbar-actions">
      <button class="btn btn-default" @click="togglerBar">
        SiderBar
      </button>

      <div class="btn-group">
        <button class="btn btn-default">
          <span class="icon icon-home"></span>
        </button>
        <button class="btn btn-default">
          <span class="icon icon-folder"></span>
        </button>
        <button class="btn btn-default active">
          <span class="icon icon-cloud"></span>
        </button>
        <button class="btn btn-default">
          <span class="icon icon-popup"></span>
        </button>
        <button class="btn btn-default">
          <span class="icon icon-shuffle"></span>
        </button>
      </div>

      <button class="btn btn-default">
        <span class="icon icon-home icon-text"></span>
        Filters
      </button>
      <button class="btn btn-default">
        <span class="icon icon-trash"></span>
      </button>
      <button class="btn btn-default">
        <span class="icon icon-arrows-ccw"></span>
      </button>
      <button class="btn btn-default">
        <span class="icon icon-arrows-ccw"></span>
      </button>
      <button class="btn btn-default" data-balloon="Reflash" data-balloon-pos="down">
        <span class="icon icon-cw"></span>
      </button>
      
      <button class="btn btn-default btn-dropdown pull-right">
        <span class="icon icon-cog"></span>
      </button>
      <div class="pull-right">
        <p-search></p-search>  
      </div>
    </div>
  </header>
</template>

<script>
import { togglerBar } from '../store/settings/actions.js'
import settingsStore from '../store/settings/store.js'

export default {
  name: 'c-header',
  props: {
  },
  computed: {
  },
  store: settingsStore,
  vuex: {
    getters:{
      barStatus: state => state.bar
    },
    actions: {
      togglerBar
    }
  },
  data () {
    return {
      title: 'Header'
    }
  },
  methods: {
    
  }
}
</script>

<style lang="stylus">
.c-header
  -webkit-app-region drag
  -webkit-user-select none
  position relative
  .title
    position absolute
    left 45%
    line-height 20px
    margin-top 6px
    display none
  .toolbar-actions
    margin-top 6px
    margin-left 80px

</style>