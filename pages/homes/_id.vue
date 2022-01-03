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
    <div v-for="review in reviews" :key="review.objectID">
      <img :src="review.reviewer.image">
      <br>
      {{ review.reviewer.name }}<br>
      {{ formatDate(review.date) }} <br>
      <short-text :text="review.comment" :target="150" /> <br>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta/types'
import Home from '@/models/home'
import Review from '@/models/review'

export default Vue.extend({
  name: 'ShowHome',
  async asyncData (context) {
    // Get home data
    const homeResponse = await context.app.$dataApi.getHome(context.params.id)
    if (!homeResponse.ok) {
      return context.error({ statusCode: homeResponse.status, message: homeResponse.statusText })
    }

    // Get reviews
    const reviewsResponse = await context.app.$dataApi.getReviewsByHomeId(context.params.id)
    if (!reviewsResponse.ok) {
      return context.error({ statusCode: reviewsResponse.status, message: reviewsResponse.statusText })
    }

    return {
      home: homeResponse.data as Home,
      reviews: reviewsResponse.data as Review[]
    }
  },
  data () {
    return {
      home: {} as Home,
      reviews: [] as Review[]
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
  methods: {
    formatDate (dateStr: string) {
      const date = new Date(dateStr)
      return date.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })
    }
  }
})
</script>

<style>

</style>
