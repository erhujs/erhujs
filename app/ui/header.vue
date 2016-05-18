<template>
  <header class="toolbar toolbar-header">
    <h1 class="title">{{title}}</h1>
    <slot></slot>
  </header>
</template>

<script>

export default {
  name: 'p-header',
  props: {
    title: String
  }
}
</script>

<style lang="stylus">

</style>