<template>
  <div style="clear:left;">
    <img :src="home.images[0]" style="width:200px;float:left;padding:10px;"><br>
    {{ home.title }}<br>
    {{ home.location.address }} {{ home.location.city }} {{ home.location.state }}<br>
    {{ pluralize(home.guests, "guest") }}, {{ pluralize(home.bedrooms, "room") }}, {{ pluralize(home.beds, "bed") }}, {{ pluralize(home.bathrooms, "bath") }} <br>
    {{ home.pricePerNight }} / night<br>
    <img src="/images/star.svg" width="20" height="20">{{ home.reviewValue }} ({{ home.reviewCount }})<br>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import Home from '@/models/home'

export default Vue.extend({
  name: 'HomeCard',
  props: {
    home: {
      type: Object as PropType<Home>,
      required: true
    }
  },
  methods: {
    pluralize (number: number, singularWord: string) {
      const text = `${number} ${singularWord}`
      if (number === 1) { return text }
      return text + 's'
    }
  }
})
</script>
