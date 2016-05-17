<template>
  <div class="c-split" 
    @mousedown="onMouseDown" 
    @mousemove="onMouseMove" 
    @mouseup="onMouseUp"
    @mouseleave="onMouseOut">
    </div>
</template>

<script>

export default {
  name: 'c-split',
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
.c-split
  width 10px
  height 100%
  margin-bottom 10px
  background #eee
  cursor col-resize
  background-image url('../assets/images/vertical.png')
  background-repeat no-repeat
  background-position center center
</style>