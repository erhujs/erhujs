<template>
  <div class="c-splitter" 
    @mousedown="onMouseDown" 
    @mousemove="onMouseMove" 
    @mouseup="onMouseUp"
    @mouseleave="onMouseOut">
    </div>
</template>

<script>

export default {
  name: 'c-splitter',
  props: {
  },
  methods: {
    onMouseDown (e) {
      console.log(e)
    },
    onMouseMove (e) {

    },
    onMouseUp (e) {

    },
    onMouseOut (e){

    }
  }
}
</script>

<style lang="stylus">
.c-splitter
  width 4px
  height 100%
  margin-bottom 10px
  background #f8f9f9
  cursor col-resize
</style>