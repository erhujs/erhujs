<template>
<div class="c-sidebar">
  <!-- sidebar group -->
  <nav class="nav-group" v-for="group in sidebar">
    <h5 class="nav-group-title">{{group.title}}</h5>
    <span class="nav-group-item" 
      v-for="item in group.list"
      :class="{active: item.active}">
      <span class="icon icon-{{item.icon}}" :style="{color: item.color ? item.color : ''}"></span>
      {{item.title}}
    </span>
  </nav>
</div>
</template>

<script>
import settingsStore from '../store/settings/store.js'

export default {
  name: 'c-sidebar',
  store: settingsStore,
  vuex: {
    getters:{
      sidebar: state => state.sidebar
    }
  },
  props: {
    
  },
  methods: {
  }
}
</script>

<style lang="stylus">
.c-sidebar
  overflow hidden
</style>