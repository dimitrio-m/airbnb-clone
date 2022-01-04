import Geoloc from '@/models/geoloc'

export default interface Marker {
  position: Geoloc,
  price: number
  id: string
}
