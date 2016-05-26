<template>
  <div class="c-req-list">
    <ul class="req-list">
      <li>
        <c-item :req="reqHead" index="#"></c-item>
      </li>
      <li v-for="it in list">
        <c-item :req="it"></c-item>
      </li>
    </ul>
  </div>
</template>

<script>
import config from '../config.js'
import Item from './Item.vue'

export default {
  name: 'c-req-list',
  components: {
    'c-item': Item,
  },
  props: {
    list: Array
  },
  data () {
    return {
      reqHead: config.reqHead,
    }
  },
  computed: {
  },
  methods: {
    
  }
}
</script>

<style lang="stylus">
.c-req-list
  border 1px solid #eee
  display flex
</style>