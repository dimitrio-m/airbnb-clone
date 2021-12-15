<template>
  <article class="max-w-xs rounded shadow-lg">
    <a href="#">
      <img :src="home.images[0]" width="360" height="175" alt="">
      <div class="p-4">
        <p>
          <span class="text-yellow-400 text-xl">★</span>
          {{ home.reviewValue }}
          <span>({{ home.reviewCount }})</span>
        </p>
        <h4 class="text-lg font-bold pb-2">
          {{ home.title }}
        </h4>
        <p class="pb-4">
          <span class="font-bold">${{ home.pricePerNight }}</span>
          <span class="text-slate-400">/ night</span>
        </p>
        <div class="flex flex-row">
          <p class="basis-1/2 text-left">House icon</p>
          <p class="basis-1/2 text-right">2 guests</p>
        </div>
      </div>
    </a>
  </article>
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
  }
})
</script>
