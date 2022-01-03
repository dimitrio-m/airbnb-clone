import Home from '@/models/home'
import Review from '@/models/review'
import User from '@/models/user'

export default interface ApiResponse {
  data: null | Home | Home[] | Review[] | User
  ok: boolean
  status: number
  statusText: string
}
