<template>
  <div>
    {{ lat }} / {{ lng }} / {{ label }}<br>
    <div v-for="home in homes" :key="home.ObjectID">
      {{ home.title }}<br>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Home from '@/models/home'

export default Vue.extend({
  name: 'SearchHome',
  async asyncData (context) {
    const lat = context.query.lat == null || Array.isArray(context.query.lat) ? '' : context.query.lat
    const lng = context.query.lng == null || Array.isArray(context.query.lng) ? '' : context.query.lng

    const response = await context.app.$dataApi.getHomesByLocation(lat, lng)

    return {
      homes: response.data as Home[],
      label: context.query.label,
      lat,
      lng
    }
  },
  data () {
    return {
      homes: [] as Home[],
      label: '',
      lat: 0,
      lng: 0
    }
  },
  watchQuery: ['lat']
})
</script>
