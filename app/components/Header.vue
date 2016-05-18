<template>
  <header class="mdl-layout__header c-header">
    <div class="mdl-layout__header-row">
      <!-- Title -->
      <span class="mdl-layout-title">Title</span>
      <!-- Add spacer, to align navigation to the right -->
      <div class="mdl-layout-spacer"></div>
      <!-- Navigation. We hide it in small screens. -->
      <nav class="mdl-navigation mdl-layout--large-screen-only">
        <a class="mdl-navigation__link" href="">Link</a>
        <a class="mdl-navigation__link" href="">Link</a>
        <a class="mdl-navigation__link" href="">Link</a>
        <a class="mdl-navigation__link" href="">Link</a>
      </nav>
    </div>
    <div class="bar">
      <mdl-button id="menu-example" icon>
        <i class="material-icons">more_vert</i>
      </mdl-button>
      <mdl-menu for="menu-example" class="mdl-menu--bottom-right">
        <mdl-menu-item>Option 1</mdl-menu-item>
        <mdl-menu-item disabled="disabled">Disabled Action</mdl-menu-item>
        <mdl-menu-item>Other Action</mdl-menu-item>
      </mdl-menu>
    </div>
  </header>
</template>

<script>

export default {
  name: 'c-header',
  props: {
  },
  computed: {
  },
  data () {
    return {
      title: 'erhu header',
      disabled: false
    }
  },
  methods: {
    
  }
}
</script>

<style lang="stylus">
.c-header
  position relative
  .bar
    position absolute
    color white
    height 64px
    padding 16px 0
    right 0
    top 0
    box-sizing border-box

</style>