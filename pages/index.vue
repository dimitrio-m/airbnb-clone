<template>
  <div>
    <h1 class="text-3xl font-bold underline">
      Hello world!
    </h1>
    <div class="flex flex-row gap-8">
      <home-card v-for="home in homes" :key="home.objectID" :home="home" />
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import homes from '@/data/homes.json'
import Home from '@/models/home'

interface HomeData {
  homes: Home[]
}

export default Vue.extend({
  name: 'Home',
  data (): HomeData {
    return {
      homes
    }
  },
  head () {
    return {
      title: 'Homepage',
      meta: [{
        name: 'description',
        content: 'This is a homepage!',
        hid: 'description'
      }]
    }
  }
})
</script>
