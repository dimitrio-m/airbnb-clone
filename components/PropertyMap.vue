<template>
  <div>
    <div class="app-wrapper app-padded-vertical">
      <h2 class="app-subtitle">
        Location
      </h2>
      <p class="app-description">
        {{ home.location.address }}
        {{ home.location.city }}
        {{ home.location.state }}
        {{ home.location.country }}
      </p>
      <div ref="map" class="app-map" />
    </div>
  </div>
</template>

<script lang="ts">

import Vue from 'vue'
import type { PropType } from 'vue'
import Home from '@/models/home'

export default Vue.extend({
  props: {
    home: {
      type: Object as PropType<Home>,
      required: true
    }
  },
  mounted () {
    this.$maps.showMap(this.$refs.map as Element, this.home._geoloc)
  }
})
</script>
