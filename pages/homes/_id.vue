<template>
  <div>
    <div style="display:flex;">
      <img v-for="image in home.images" :key="image" :src="image" width="200" height="150">
    </div>
    {{ home.title }}<br>
    ${{ home.pricePerNight }} / night<br>
    <img src="/images/marker.svg" width="20" height="20">{{ home.location.address }} {{ home.location.city }} {{ home.location.state }} {{ home.location.country }}<br>
    <img src="/images/star.svg" width="20" height="20">{{ home.reviewValue }} <br>
    {{ home.guests }} guests, {{ home.bedrooms }} rooms, {{ home.beds }} beds, {{ home.bathrooms }} bath<br>
    {{ home.description }}
    <div ref="map" style="height:800px;width:800px" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta/types'
import Home from '@/models/home'

export default Vue.extend({
  name: 'ShowHome',
  async asyncData (context) {
    const response = await context.app.$dataApi.getHome(context.params.id)

    if (!response.ok) {
      return context.error({ statusCode: response.status, message: response.statusText })
    }

    return { home: response.json }
  },
  data () {
    return {
      home: {} as Home
    }
  },
  head (): MetaInfo {
    return {
      title: this.home.title
    }
  },
  mounted () {
    this.$maps.showMap(this.$refs.map as Element, this.home._geoloc)
  }
})
</script>

<style>

</style>
