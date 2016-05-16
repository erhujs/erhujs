<template>
  <div class="c-item">
    <div class="item">{{req.host}}</div>
    <div class="item">{{req.path}}</div>
    <div class="item">{{req.server}}</div>
  </div>
</template>

<script>

export default {
  name: 'c-item',
  props: {
    req: Object
  },
  computed: {
  },
  data () {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>

<style lang="stylus">
.c-item
  border 1px solid #eee
  display flex
  .item
    flex 1
    border-right 1px solid #eee
</style>