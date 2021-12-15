import Geoloc from './geoloc'
import Host from './host'
import Location from './location'

export default interface Home {
  objectID: string
  type: string
  title: string
  description: string
  note: string
  reviewCount: number
  reviewValue: number
  features: string[]
  pricePerNight: number
  location: Location
  guests: number
  bedrooms: number
  beds: number
  bathrooms: number
  images: string[]
  host: Host
  _geoloc: Geoloc
}
