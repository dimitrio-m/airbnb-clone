import Home from './home'

export default interface ApiResponse {
  json: Object | Home | Home[]
  ok: boolean
  status: number
  statusText: string
}
