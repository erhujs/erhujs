<template>
  <div>
    <c-header></c-header>
    <div>body</div>  
  </div>
</template>

<script>
import Header from './components/Header.vue'

export default {
  name: 'App',
  components: {
    'c-header': Header
  },
  props: {
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

</style>