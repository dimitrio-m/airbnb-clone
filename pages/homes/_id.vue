<template>
  <div>
    <h1>{{ home.title }}</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import homes from '@/data/homes.json'
import Home from '@/models/home'

export default Vue.extend({
  name: 'ShowHome',
  data () {
    return {
      home: {} as Home
    }
  },
  created () : void {
    const home = homes.find((home: Home) => home.objectID === this.$route.params.id)
    if (home) {
      this.home = home
    }
  }
})
</script>

<style>

</style>
