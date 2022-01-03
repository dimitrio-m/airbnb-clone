export default interface Review {
  objectID: string
  homeId: string
  reviewer: {
    image: string,
    name: string
  }
  rating: number
  date: string
  comment: string
}
