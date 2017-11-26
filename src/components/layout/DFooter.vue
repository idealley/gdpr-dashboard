<template>
  <v-bottom-nav app :value="true" :active.sync="e1">
  </v-bottom-nav>
</template>

<script>
  export default {
    name: 'd-footer',
    data () {
      return {
        e1: 'recent',
        sheet: false
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../stylus/main'
</style>
