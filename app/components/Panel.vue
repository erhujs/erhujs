<template>
  <div class="c-panel" :style="{width: width + '%'}">
    <slot>panel</slot>
  </div>
</template>

<script>

export default {
  name: 'c-panel',
  props: {
    width: Number
  },
  computed: {
    widthStyle () {

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