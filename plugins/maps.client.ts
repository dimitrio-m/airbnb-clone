import { Plugin } from '@nuxt/types'
import Geoloc from '@/models/geoloc'

declare module 'vue/types/vue' {
  // this.$myInjectedFunction inside Vue components
  interface Vue {
    $maps: {
      showMap(canvas: Element, location: Geoloc): void
    }
  }
}

declare module '@nuxt/types' {
  // nuxtContext.app.$myInjectedFunction inside asyncData, fetch, plugins, middleware, nuxtServerInit
  interface NuxtAppOptions {
    $maps: {
      showMap(canvas: Element, location: Geoloc): void
    }
  }
  // nuxtContext.$myInjectedFunction
  interface Context {
    $maps: {
      showMap(canvas: Element, location: Geoloc): void
    }
  }
}

declare module 'vuex/types/index' {
  // this.$myInjectedFunction inside Vuex stores
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  interface Store<S> {
    $maps: {
      showMap(canvas: Element, location: Geoloc): void
    }
  }
}

declare global {
  interface Window {
    initMap(): void
    google: any
  }
}

const plugin: Plugin = (_context, inject) => {
  let mapLoaded: boolean = false
  let mapWaiting: { canvas: Element, location: Geoloc } | null = null

  addScript()

  inject('maps', {
    showMap
  })

  function addScript () {
    const script = document.createElement('script')
    script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyD5S1mQ6m3u8i2L9u0J3LZ6YvI3QUSydL8&libraries=places&callback=initMap'
    script.async = true
    window.initMap = initMap
    document.head.appendChild(script)
  }

  function initMap () {
    mapLoaded = true
    if (mapWaiting) {
      const { canvas, location } = mapWaiting
      renderMap(canvas, location)
      mapWaiting = null
    }
  }

  function showMap (canvas: Element, location: Geoloc) {
    if (mapLoaded) {
      renderMap(canvas, location)
    } else {
      mapWaiting = { canvas, location }
    }
  }

  function renderMap (canvas: Element, location: Geoloc) {
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
