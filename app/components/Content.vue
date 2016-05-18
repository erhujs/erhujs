<template>
  <div class="c-content">
    <span>Content: <br>{{content}}</span>
  </div>
</template>

<script>

export default {
  name: 'c-content',
  props: {
    content: String
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
.c-content
  border 1px solid #eee
  display flex
</style>