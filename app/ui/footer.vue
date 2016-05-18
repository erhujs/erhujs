<template>
  <footer class="toolbar toolbar-footer">
    <h1 class="title" v-if="title">{{title}}</h1>
    <slot></slot>
  </footer>
</template>

<script>

export default {
  name: 'p-footer',
  props: {
    title: String
  }
}
</script>

<style lang="stylus">

</style>