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
import homes from '@/data/homes.json'
import Home from '@/models/home'

export default Vue.extend({
  name: 'ShowHome',
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
  },
  created () {
    const home = homes.find((home: Home) => home.objectID === this.$route.params.id)
    if (home) {
      this.home = home
    }
  }
})
</script>

<style>

</style>
