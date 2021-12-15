<template>
  <div>
    <h1 class="text-3xl font-bold underline">
      Hello world!
    </h1>
    <div class="flex flex-row gap-8">
      <home-card v-for="home in homes" :key="home.objectId" :home="home" />
    </div>
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
