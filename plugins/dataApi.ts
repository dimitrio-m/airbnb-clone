import { Plugin } from '@nuxt/types'
import Home from '@/models/home'
import ApiResponse from '@/models/apiResponse'

declare module 'vue/types/vue' {
  // this.$myInjectedFunction inside Vue components
  interface Vue {
    $dataApi: {
      getHome(id: string): Promise<ApiResponse>
    }
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$myInjectedFunction inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $dataApi: {
      getHome(id: string): Promise<ApiResponse>
    }
  }
  // nuxtContext.$myInjectedFunction
  interface Context {
    $dataApi: {
      getHome(id: string): Promise<ApiResponse>
    }
  }
}

declare module 'vuex/types/index' {
  // this.$myInjectedFunction inside Vuex stores
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $dataApi: {
      getHome(id: string): Promise<ApiResponse>
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
    getHome
  })

  async function getHome (id: string): Promise<ApiResponse> {
    try {
      const response = await fetch(`https://${appId}-dsn.algolia.net/1/indexes/homes/${id}`, { headers })
      return unWrap(response)
    } catch (error) {
      return getErrorResponse(error as Error)
    }
  }

  async function unWrap (response: Response) {
    const json: Home = await response.json()
    const { ok, status, statusText } = response
    return {
      json,
      ok,
      status,
      statusText
    }
  }

  function getErrorResponse (error: Error) {
    return {
      ok: false,
      status: 500,
      statusText: error.message,
      json: {}
    }
  }
}

export default plugin