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
      title: 'erhu header test'
    }
  },
  methods: {
    
  }
}
</script>

<style lang="stylus">
.header
  margin-bottom 10px
</style>