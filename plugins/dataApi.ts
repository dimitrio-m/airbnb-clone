import { Plugin } from '@nuxt/types'
import Home from '@/models/home'
import Review from '@/models/review'
import User from '@/models/user'
import ApiResponse from '@/models/apiResponse'

declare module 'vue/types/vue' {
  // this.$myInjectedFunction inside Vue components
  interface Vue {
    $dataApi: {
      getHome(id: string): Promise<ApiResponse>
      getReviewsByHomeId(homeId: string): Promise<ApiResponse>
      getUserByHomeId(homeId: string): Promise<ApiResponse>
    }
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$myInjectedFunction inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $dataApi: {
      getHome (id: string): Promise<ApiResponse>
      getReviewsByHomeId(homeId: string): Promise<ApiResponse>
      getUserByHomeId(homeId: string): Promise<ApiResponse>
    }
  }
  // nuxtContext.$myInjectedFunction
  interface Context {
    $dataApi: {
      getHome (id: string): Promise<ApiResponse>
      getReviewsByHomeId(homeId: string): Promise<ApiResponse>
      getUserByHomeId(homeId: string): Promise<ApiResponse>
    }
  }
}

declare module 'vuex/types/index' {
  // this.$myInjectedFunction inside Vuex stores
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $dataApi: {
      getHome (id: string): Promise<ApiResponse>
      getReviewsByHomeId (homeId: string): Promise<ApiResponse>
      getUserByHomeId(homeId: string): Promise<ApiResponse>
    }
  }
}

const plugin: Plugin = (_context, inject) => {
  const appId = '2EIY7J5271'
  const apiKey = '523781a66ff83e1e0ea79c7daf1c310c'
  const headers = {
    'X-Algolia-API-Key': apiKey,
    'X-Algolia-Application-Id': appId
  }

  inject('dataApi', {
    getHome,
    getReviewsByHomeId,
    getUserByHomeId
  })

  async function getHome (id: string): Promise<ApiResponse> {
    try {
      const response = await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/${id}`, { headers })
      const data: Home = await response.json()
      const { ok, status, statusText } = response
      return {
        data,
        ok,
        status,
        statusText
      }
    } catch (error) {
      return getErrorResponse(error as Error)
    }
  }

  async function getReviewsByHomeId (homeId: string): Promise<ApiResponse> {
    try {
      const response = await fetch(`https://${appId}-dsn.algolia.net/1/indexes/reviews/query`, {
        headers,
        method: 'POST',
        body: JSON.stringify({
          filters: `homeId:${homeId}`,
          hitsPerPage: 6,
          attributesToHighlight: []
        })
      })
      const data: Review[] = (await response.json()).hits
      const { ok, status, statusText } = response
      return {
        data,
        ok,
        status,
        statusText
      }
    } catch (error) {
      return getErrorResponse(error as Error)
    }
  }

  async function getUserByHomeId (homeId: string): Promise<ApiResponse> {
    try {
      const response = await fetch(`https://${appId}-dsn.algolia.net/1/indexes/users/query`, {
        headers,
        method: 'POST',
        body: JSON.stringify({
          filters: `homeId:${homeId}`,
          attributesToHighlight: []
        })
      })
      const data: User = (await response.json()).hits[0]
      const { ok, status, statusText } = response
      return {
        data,
        ok,
        status,
        statusText
      }
    } catch (error) {
      return getErrorResponse(error as Error)
    }
  }

  function getErrorResponse (error: Error) {
    return {
      ok: false,
      status: 500,
      statusText: error.message,
      data: null
    }
  }
}

export default plugin
