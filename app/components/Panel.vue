<template>
  <div class="c-panel" :style="{width: widthStyle}">
    <slot>panel</slot>
  </div>
</template>

<script>

export default {
  name: 'c-panel',
  props: {
    size: Number
  },
  computed: {
    widthStyle () {
      return 'calc(' + this.size + '% - 5px)'
    }
  },
  methods: {
    
  }
}
</script>

<style lang="stylus">
.c-panel
  overflow scroll
  flex 1
  border 1px solid #eee
</style>