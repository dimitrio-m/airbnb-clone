<template>
  <div class="app-background-grey">
    <div class="app-wrapper app-padded-vertical">
      <div class="app-host-header">
        <div><img :src="user.image"></div>
        <div>
          <div class="app-host-name">
            {{ user.name }}
          </div>
          <div class="app-host-date">
            Joined in {{ shortDate(user.joined) }}
          </div>
          <div class="app-flex">
            <div class="app-host-reviews">
              {{ user.reviewCount }} reviews
            </div>
          </div>
        </div>
      </div>
      <div class="app-host-description">
        {{ user.description }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import type { PropType } from 'vue'
import shortDate from '~/utils/shortDate'
import User from '@/models/user'

export default Vue.extend({
  props: {
    user: {
      type: Object as PropType<User>,
      required: true
    }
  },
  methods: {
    shortDate
  }
})
</script>
