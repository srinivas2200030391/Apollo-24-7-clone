import mongoose, { Schema, type Document } from "mongoose"

export interface DoctorDocument extends Document {
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

const DoctorSchema = new Schema<DoctorDocument>(
  {
    name: { type: String, required: true },
    image: { type: String, default: "/placeholder.svg?height=128&width=128" },
    specialization: { type: String, required: true },
    qualification: { type: String, required: true },
    experience: { type: Number, required: true },
    city: { type: String, required: true },
    gender: { type: String, required: true, enum: ["Male", "Female"] },
    languages: { type: [String], required: true },
    consultationFee: { type: Number, required: true },
    rating: { type: Number, default: 0 },
    reviewCount: { type: Number, default: 0 },
    availability: { type: [String], default: [] },
  },
  {
    timestamps: true,
  },
)

export default mongoose.models.Doctor || mongoose.model<DoctorDocument>("Doctor", DoctorSchema)
