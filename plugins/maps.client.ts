import { Plugin } from '@nuxt/types'
import Geoloc from '@/models/geoloc'

declare module 'vue/types/vue' {
  // this.$myInjectedFunction inside Vue components
  interface Vue {
    $maps: {
      showMap(canvas: Element, location: Geoloc): void
      makeAutoComplete (input: Element): void
    }
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$myInjectedFunction inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $maps: {
      showMap(canvas: Element, location: Geoloc): void
      makeAutoComplete (input: Element): void
    }
  }
  // nuxtContext.$myInjectedFunction
  interface Context {
    $maps: {
      showMap(canvas: Element, location: Geoloc): void
      makeAutoComplete (input: Element): void
    }
  }
}

declare module 'vuex/types/index' {
  // this.$myInjectedFunction inside Vuex stores
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $maps: {
      showMap(canvas: Element, location: Geoloc): void
      makeAutoComplete (input: Element): void
    }
  }
}

declare global {
  interface Window {
    initGoogleMaps(): void
    google: any
  }
}

interface WaitingCall {
  fn: Function
  arguments: any
}

const plugin: Plugin = (_context, inject) => {
  let isLoaded: boolean = false
  let waiting: WaitingCall[] = []

  addScript()

  inject('maps', {
    showMap,
    makeAutoComplete
  })

  function addScript () {
    const script = document.createElement('script')
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD5S1mQ6m3u8i2L9u0J3LZ6YvI3QUSydL8&libraries=places&callback=initGoogleMaps'
    script.async = true
    window.initGoogleMaps = initGoogleMaps
    document.head.appendChild(script)
  }

  function initGoogleMaps () {
    isLoaded = true
    waiting.forEach((item) => {
      if (typeof item.fn === 'function') {
        item.fn(...item.arguments)
      }
    })
    waiting = []
  }

  function makeAutoComplete (input: Element) {
    if (!isLoaded) {
      waiting.push({ fn: makeAutoComplete, arguments })
      return
    }

    const autoComplete = new window.google.maps.places.Autocomplete(input, { types: ['(cities)'] })
    autoComplete.addListener('place_changed', () => {
      const place = autoComplete.getPlace()
      input.dispatchEvent(new CustomEvent('changed', { detail: place }))
    })
  }

  function showMap (canvas: Element, location: Geoloc) {
    if (!isLoaded) {
      waiting.push({
        fn: showMap,
        arguments
      })
      return
    }
    const mapOptions = {
      zoom: 18,
      center: new window.google.maps.LatLng(location.lat, location.lng),
      disableDefaultUI: true,
      zoomControl: true
    }
    const map = new window.google.maps.Map(canvas, mapOptions)
    const position = new window.google.maps.LatLng(location.lat, location.lng)
    const marker = new window.google.maps.Marker({ position })
    marker.setMap(map)
  }
}

export default plugin
