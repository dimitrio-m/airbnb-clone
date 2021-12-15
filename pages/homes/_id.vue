<template>
  <div>
    <h1>{{ home.title }}</h1>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import homes from '@/data/homes.json'
import Home from '@/models/home'

interface ShowHomeData {
  home: Home | undefined
}

export default Vue.extend({
  name: 'ShowHome',
  data () : ShowHomeData {
    return {
      home: undefined
    }
  },
  created () : void {
    this.home = homes.find((home: Home) => home.objectID === this.$route.params.id)
  }
})
</script>

<style>

</style>
