<template>
  <div>
    Results for {{ label }}<br>
    <div ref="map" style="height:800px;width:800px;float:right;" />
    <div v-if="homes.length > 0">
      <nuxt-link v-for="home in homes" :key="home.objectID" :to="`/homes/${home.objectID}`">
        <HomeRow :home="home" @mouseover.native="highlightMarker(home.objectID, true)" @mouseout.native="highlightMarker(home.objectID, false)" />
      </nuxt-link>
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
import Marker from '@/models/marker'

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
    this.updateMap()

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
  },
  mounted () {
    this.updateMap()
  },
  methods: {
    highlightMarker (homeId: string, isHighlighted: boolean) {
      document.getElementsByClassName(`home-${homeId}`)[0]?.classList?.toggle('marker-highlight', isHighlighted)
    },
    updateMap () {
      this.$maps.showMap(this.$refs.map as Element, { lat: this.lat, lng: this.lng }, this.getHomeMarkers())
    },
    getHomeMarkers (): Marker[] {
      return this.homes.map((home) => {
        return {
          position: home._geoloc,
          price: home.pricePerNight,
          id: home.objectID
        }
      })
    }
  }
})
</script>

<style>
.marker {
  background-color: white;
  border: 1px solid lightgray;
  font-weight: bold;
  border-radius: 20px;
  padding: 5px 8px;
}
.marker-highlight {
  color: white !important;
  background-color: black;
  border-color:black;
}
</style>
