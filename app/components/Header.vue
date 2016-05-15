<template>
  <div class="header">
    {{title}}
  </div>
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
      title: 'erhu header'
    }
  },
  methods: {
    
  }
}
</script>

<style lang="stylus">
.header
  border 1px solid #000
</style>