import Home from './home'
import Review from './review'

export default interface ApiResponse {
  data: null | Home | Home[] | Review[]
  ok: boolean
  status: number
  statusText: string
}
