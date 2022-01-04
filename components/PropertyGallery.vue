<template>
  <div class="app-section">
    <div class="app-wrapper">
      <div class="app-masonry">
        <div
          v-for="image in images"
          :key="image"
          :style="`background-image: url(${image})`"
        />
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'

export default Vue.extend({
  props: {
    images: {
      type: Array as PropType<string[]>,
      required: true
    }
  }
})
</script>
