export default interface Review {
  objectID: string
  homeId: string
  reviewer: {
    image: string,
    name: string
  }
  rating: string
  date: string
  comment: string
}
