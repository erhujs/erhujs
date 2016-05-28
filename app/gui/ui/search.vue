<template>
  <div class="photon-search">
    <span class="icon icon-search"></span>
    <input class="form-control" type="text" placeholder="Search">
  </div>
</template>

<script>

export default {
  name: 'photon-search',
  props: {
  },
  methods: {
    
  }
}
</script>

<style lang="stylus">
.photon-search
  position relative
  .icon
    top 0
    left 0
    position absolute
    height 24px
    line-height 24px
    padding 0 8px
  .form-control
    min-height 24px
    padding 1px 10px
    padding-left 24px
</style>