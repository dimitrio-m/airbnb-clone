<template>
  <div>
    <h1 class="text-3xl font-bold underline">
      Hello world!
    </h1>
    <p>{{ homes[0] }}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import homes from '@/data/homes.json'

export default Vue.extend({
  data () {
    return {
      homes
    }
  }
})
</script>
