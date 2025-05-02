export interface Doctor {
  _id: string
  name: string
  image: string
  specialization: string
  qualification: string
  experience: number
  city: string
  gender: string
  languages: string[]
  consultationFee: number
  rating: number
  reviewCount: number
  availability: string[]
}
