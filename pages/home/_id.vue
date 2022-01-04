<template>
  <div>
    <PropertyGallery :images="home.images" />
    <PropertyDetails :home="home" />
    <PropertyDescription :home="home" />
    <PropertyMap :home="home" />
    <PropertyReviews :reviews="reviews" />
    <PropertyHost :user="user" />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import { MetaInfo } from 'vue-meta/types'
import Home from '@/models/home'
import Review from '@/models/review'
import User from '@/models/user'

export default Vue.extend({
  name: 'ShowHome',
  async asyncData (context) {
    const responses = await Promise.all([
      context.app.$dataApi.getHome(context.params.id),
      context.app.$dataApi.getReviewsByHomeId(context.params.id),
      context.app.$dataApi.getUserByHomeId(context.params.id)
    ])

    const badResponse = responses.find(response => !response.ok)
    if (badResponse) {
      return context.error({ statusCode: badResponse.status, message: badResponse.statusText })
    }

    return {
      home: responses[0].data as Home,
      reviews: responses[1].data as Review[],
      user: responses[2].data as User
    }
  },
  data () {
    return {
      home: {} as Home,
      reviews: [] as Review[],
      user: {} as User
    }
  },
  head (): MetaInfo {
    return {
      title: this.home.title
    }
  }
})
</script>

<style>

</style>
