<template>
  <span>{{ displayText }}
    <button v-if="isTooLong && !isExpanded" class="link" type="button" @click="isExpanded = true">read more</button>
    <button v-if="isTooLong && isExpanded" class="link" type="button" @click="isExpanded = false">read less</button>
  </span>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: {
    text: {
      type: String,
      required: true
    },
    target: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      isExpanded: false,
      chunks: [] as string[]
    }
  },
  computed: {
    isTooLong (): boolean {
      return this.chunks.length === 2
    },
    displayText (): string {
      if (!this.isTooLong || this.isExpanded) { return this.chunks.join(' ') }
      return this.chunks[0] + '...'
    }
  },
  created () {
    this.chunks = this.getChunks()
  },
  methods: {
    getChunks (): string[] {
      const position = this.text.indexOf(' ', this.target)
      if (this.text.length <= this.target || position === -1) { return [this.text] }
      return [this.text.substring(0, position), this.text.substring(position)]
    }
  }
})
</script>

<style scoped>
.link {
    color: blue;
    background-color: white;
    border: none;
    text-decoration: underline;
    cursor: pointer;
}
.link:focus{
    border: none;
    outline: none;
}
</style>
