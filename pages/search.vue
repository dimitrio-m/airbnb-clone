<template>
  <div>
    {{ lat }} / {{ lng }} / {{ label }}<br>
    <div v-if="homes.length > 0">
      <HomeRow v-for="home in homes" :key="home.objectID" :home="home" />
    </div>
    <div v-else>
      No results found
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta/types'
import Home from '@/models/home'

export default Vue.extend({
  name: 'SearchHome',
  async beforeRouteUpdate (to, _from, next) {
    const lat = to.query.lat == null || Array.isArray(to.query.lat) ? '' : to.query.lat
    const lng = to.query.lng == null || Array.isArray(to.query.lng) ? '' : to.query.lng
    const label = to.query.label == null || Array.isArray(to.query.label) ? '' : to.query.label

    const response = await this.$dataApi.getHomesByLocation(lat, lng)
    this.homes = response.data as Home[]
    this.label = label
    this.lat = lat
    this.lng = lng

    next()
  },
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
      lat: '',
      lng: ''
    }
  },
  head (): MetaInfo {
    return {
      title: `Homes around ${this.label}`
    }
  }
})
</script>
