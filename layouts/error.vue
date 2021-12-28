<template>
  <div style="text-align: center;">
    <img src="https://media1.tenor.com/images/99f00b32545bf5b5db8bf8ecbb7f0aec/tenor.gif?itemid=7971019"><br><br>
    <h1>Error!</h1>
    {{ error.message }} {{ error.statusCode }}
  </div>
</template>
<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'

export default Vue.extend({
  props: {
    error: {
      type: Object as PropType<{ message: string, statusCode: number}>,
      required: true
    }
  },
  head () {
    return {
      title: 'BIG PROBLEMS'
    }
  }
})
</script>
